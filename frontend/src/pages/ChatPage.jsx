import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Send, Bot, User as UserIcon, Sparkles, MessageSquare,
  Trash2, Plus, Menu, X, ChevronRight, Mic, MicOff,
  Copy, Check, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const suggestions = [
  'How to apply for admission?',
  'What courses are offered?',
  'What is the fee structure?',
  'Tell me about placements',
  'Hostel facilities',
  'Scholarship schemes',
  'Contact details',
  'Campus facilities',
  'PhD programs',
  'Transport routes',
];

const TypingLoader = () => (
  <div className="flex gap-2 items-center px-4 py-3">
    <span className="typing-dot" />
    <span className="typing-dot" />
    <span className="typing-dot" />
  </div>
);

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
        isUser
          ? 'bg-primary-600/30 text-primary-400'
          : 'text-white'
      }`} style={!isUser ? { background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' } : {}}>
        {isUser ? <UserIcon size={14} /> : <Bot size={14} />}
      </div>

      <div className={`max-w-[80%] md:max-w-[70%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`relative rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'rounded-tr-sm text-primary-100'
            : 'rounded-tl-sm glass text-gray-200'
        }`}
        style={isUser ? { background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,212,255,0.15))' } : {}}>
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-gray-300">{children}</li>,
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                h1: ({ children }) => <h1 className="text-lg font-bold text-white mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold text-white mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold text-white mb-1">{children}</h3>,
                code: ({ children }) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
                table: ({ children }) => <div className="overflow-x-auto"><table className="w-full text-xs border-collapse mb-2">{children}</table></div>,
                th: ({ children }) => <th className="border border-white/10 px-2 py-1 bg-white/5 text-left">{children}</th>,
                td: ({ children }) => <td className="border border-white/10 px-2 py-1">{children}</td>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {!isUser && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 self-start text-gray-600 hover:text-gray-400 transition-all duration-200 text-xs flex items-center gap-1"
          >
            {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}

        <span className="text-gray-600 text-xs px-1">
          {message.timestamp ? new Date(message.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''}
        </span>
      </div>
    </motion.div>
  );
};

const ChatPage = () => {
  const { chatId: routeChatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(routeChatId || null);
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
    if (routeChatId) {
      loadChat(routeChatId);
    } else if (location.state?.initialQuery) {
      sendMessage(location.state.initialQuery);
    }
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-IN';
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fetchChatHistory = async () => {
    try {
      const res = await api.get('/chat/history');
      setChatHistory(res.data.chats || []);
    } catch {
      setChatHistory([]);
    }
  };

  const loadChat = async (id) => {
    try {
      const res = await api.get(`/chat/${id}`);
      if (res.data.chat) {
        setMessages(res.data.chat.messages);
        setChatId(id);
      }
    } catch {
      navigate('/chat');
    }
  };

  const sendMessage = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || loading) return;

    setInput('');
    const userMsg = { role: 'user', content: msgText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.post('/chat/message', { message: msgText, chatId });
      const assistantMsg = { role: 'assistant', content: res.data.reply, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
      if (!chatId && res.data.chatId) {
        setChatId(res.data.chatId);
        navigate(`/chat/${res.data.chatId}`, { replace: true });
        fetchChatHistory();
      }
    } catch (err) {
      const errMsg = {
        role: 'assistant',
        content: err.response?.status === 401
          ? 'Your session has expired. Please log in again.'
          : "I'm having trouble connecting right now. Please check if the backend server is running and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setChatId(null);
    setSidebarOpen(false);
    navigate('/chat');
    inputRef.current?.focus();
  };

  const deleteChat = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/chat/${id}`);
      setChatHistory(prev => prev.filter(c => c._id !== id));
      if (chatId === id) startNewChat();
    } catch {}
  };

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-dark flex overflow-hidden">
      <div className={`fixed inset-y-0 left-0 z-50 w-72 glass border-r border-white/5 flex flex-col transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                <Sparkles size={13} className="text-white" />
              </div>
              <span className="font-bold text-white text-sm">PU <span className="gradient-text">Assistant</span></span>
            </Link>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <button
            onClick={startNewChat}
            className="w-full btn-primary text-sm py-2.5 justify-center"
          >
            <Plus size={15} /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <p className="text-xs text-gray-600 px-3 py-2 uppercase tracking-wider">Recent Chats</p>
          {chatHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-xs">No chat history yet</div>
          ) : (
            chatHistory.map((chat) => (
              <button
                key={chat._id}
                onClick={() => { loadChat(chat._id); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                  chatId === chat._id ? 'bg-primary-500/10 border border-primary-500/20' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MessageSquare size={13} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-300 truncate">{chat.title}</span>
                </div>
                <button
                  onClick={(e) => deleteChat(chat._id, e)}
                  className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all p-1"
                >
                  <Trash2 size={13} />
                </button>
              </button>
            ))
          )}
        </div>

        <div className="p-4 border-t border-white/5">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-2">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            <span className="text-xs">Sign out</span>
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass border-b border-white/5 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
              <Bot size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">PU Assistant AI</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-400">Online · Powered by Gemini</span>
              </div>
            </div>
          </div>
          <button onClick={startNewChat} className="text-gray-400 hover:text-white transition-colors" title="New Chat">
            <Plus size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.length === 0 && !loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 animate-float"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                  <Bot size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Hi {user?.name?.split(' ')[0]}! 👋</h2>
                <p className="text-gray-400 text-sm max-w-md mb-8">
                  I'm your AI assistant for Poornima University. Ask me anything about admissions, courses, fees, hostel, placements, or campus life!
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {suggestions.slice(0, 6).map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-4 py-2 rounded-full text-sm text-gray-300 border border-white/10 hover:border-primary-500/40 hover:text-white hover:bg-primary-500/10 transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                      <Bot size={14} />
                    </div>
                    <div className="glass rounded-2xl rounded-tl-sm">
                      <TypingLoader />
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {messages.length > 0 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
            {suggestions.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs text-gray-400 border border-white/10 hover:border-primary-500/40 hover:text-white transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-white/5 flex-shrink-0">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1 glass rounded-2xl border border-white/10 focus-within:border-primary-500/50 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Poornima University..."
                rows={1}
                id="chat-input"
                className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-600 outline-none resize-none text-sm max-h-32"
                style={{ lineHeight: '1.5' }}
              />
            </div>

            {'webkitSpeechRecognition' in window && (
              <button
                onClick={toggleVoice}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  listening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'glass text-gray-400 hover:text-white hover:border-white/20'
                }`}
                title="Voice input"
              >
                {listening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>
            )}

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              id="chat-send"
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
            >
              <Send size={17} />
            </button>
          </div>
          <p className="text-center text-gray-600 text-xs mt-2">
            PU Assistant may occasionally make mistakes. Verify important details with the university directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
