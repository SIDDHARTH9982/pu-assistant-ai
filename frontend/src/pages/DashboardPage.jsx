import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare, GraduationCap, BookOpen, Building2, Users,
  Bell, LogOut, Menu, X, Sparkles, TrendingUp, Trophy,
  Clock, ChevronRight, Zap, Star, Bot
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchNotices();
    fetchChats();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/admin/notices');
      setNotices(res.data.notices?.slice(0, 4) || []);
    } catch {
      setNotices(mockNotices);
    }
  };

  const fetchChats = async () => {
    try {
      const res = await api.get('/chat/history');
      setRecentChats(res.data.chats?.slice(0, 4) || []);
    } catch {
      setRecentChats([]);
    }
  };

  const mockNotices = [
    { _id: '1', title: 'Admissions Open 2024-25', category: 'admission', date: new Date().toISOString(), isPinned: true },
    { _id: '2', title: 'Campus Placement Drive - August 2024', category: 'placement', date: new Date().toISOString() },
    { _id: '3', title: 'End Semester Exam Schedule Released', category: 'exam', date: new Date().toISOString() },
    { _id: '4', title: 'Smart India Hackathon Registration Open', category: 'event', date: new Date().toISOString() },
  ];

  const quickActions = [
    { label: 'How to apply?', query: 'How to apply for admission at Poornima University?' },
    { label: 'Fee structure', query: 'What is the fee structure for B.Tech at Poornima University?' },
    { label: 'Scholarships', query: 'What scholarships are available at Poornima University?' },
    { label: 'Hostel info', query: 'Tell me about hostel facilities at Poornima University' },
    { label: 'Placements', query: 'What is the placement record of Poornima University?' },
    { label: 'Contact details', query: 'What are the contact details of Poornima University?' },
  ];

  const stats = [
    { label: 'Students Placed', value: '2100+', icon: TrendingUp, color: 'from-violet-500/20 to-violet-500/5' },
    { label: 'Top Package', value: '₹42 LPA', icon: Trophy, color: 'from-amber-500/20 to-amber-500/5' },
    { label: 'Recruiters', value: '300+', icon: Building2, color: 'from-cyan-500/20 to-cyan-500/5' },
    { label: 'Programs', value: '50+', icon: BookOpen, color: 'from-emerald-500/20 to-emerald-500/5' },
  ];

  const categoryColors = {
    admission: 'bg-blue-500/20 text-blue-300',
    placement: 'bg-green-500/20 text-green-300',
    exam: 'bg-red-500/20 text-red-300',
    event: 'bg-purple-500/20 text-purple-300',
    academic: 'bg-yellow-500/20 text-yellow-300',
    general: 'bg-gray-500/20 text-gray-300',
  };

  const handleQuickAction = (query) => {
    navigate('/chat', { state: { initialQuery: query } });
  };

  return (
    <div className="min-h-screen bg-dark flex">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-bold text-white">PU <span className="gradient-text">Assistant</span></span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {[
              { label: 'Dashboard', icon: Sparkles, href: '/dashboard', active: true },
              { label: 'AI Chat', icon: MessageSquare, href: '/chat' },
              { label: 'Admissions', icon: GraduationCap, href: '/chat', query: 'Tell me about admissions at Poornima University' },
              { label: 'Courses', icon: BookOpen, href: '/chat', query: 'What courses are offered at Poornima University?' },
              { label: 'Placements', icon: TrendingUp, href: '/chat', query: 'Tell me about placements at Poornima University' },
              { label: 'Hostel', icon: Building2, href: '/chat', query: 'Tell me about hostel at Poornima University' },
              { label: 'Contact', icon: Users, href: '/chat', query: 'What are the contact details of Poornima University?' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setSidebarOpen(false);
                    if (item.query) {
                      navigate('/chat', { state: { initialQuery: item.query } });
                    } else {
                      navigate(item.href);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={item.active ? { background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.1))' } : {}}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 mb-3 px-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
                {user?.name?.[0]}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{user?.name}</p>
                <p className="text-gray-500 text-xs truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">Dashboard</h1>
              <p className="text-xs text-gray-400">Welcome back, {user?.name?.split(' ')[0]}! 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/chat" className="btn-primary text-sm py-2 px-4">
              <MessageSquare size={15} />
              Open Chat
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto space-y-8">
          <motion.div {...fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={`rounded-2xl p-5 bg-gradient-to-br ${stat.color} border border-white/5`}>
                  <Icon size={20} className="text-white/70 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center gap-2 mb-5">
              <Zap size={18} className="text-primary-400" />
              <h2 className="font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.query)}
                  className="px-4 py-2 rounded-full text-sm text-gray-300 border border-white/10 hover:border-primary-500/40 hover:text-white hover:bg-primary-500/10 transition-all duration-200"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-primary-400" />
                  <h2 className="font-semibold text-white">Latest Notices</h2>
                </div>
                <span className="text-xs text-gray-500">From University</span>
              </div>

              <div className="space-y-3">
                {(notices.length > 0 ? notices : mockNotices).map((notice) => (
                  <div key={notice._id} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {notice.isPinned && <span className="text-yellow-400 text-xs">📌</span>}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[notice.category] || categoryColors.general}`}>
                          {notice.category}
                        </span>
                      </div>
                      <p className="text-white text-sm font-medium truncate">{notice.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary-400" />
                  <h2 className="font-semibold text-white">Recent Chats</h2>
                </div>
                <Link to="/chat" className="text-xs text-primary-400 hover:text-primary-300">View all</Link>
              </div>

              {recentChats.length > 0 ? (
                <div className="space-y-2">
                  {recentChats.map((chat) => (
                    <Link
                      key={chat._id}
                      to={`/chat/${chat._id}`}
                      className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.1))' }}>
                        <Bot size={14} className="text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{chat.title}</p>
                        <p className="text-gray-500 text-xs">{chat.messages?.length || 0} messages</p>
                      </div>
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bot size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No chats yet</p>
                  <p className="text-gray-600 text-xs mb-4">Start a conversation with PU Assistant</p>
                  <Link to="/chat" className="btn-primary text-sm py-2 px-4 inline-flex">
                    Start Chatting
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                title: 'Admission Guide',
                desc: 'Complete step-by-step admission process for all programs',
                icon: GraduationCap,
                query: 'Give me a complete admission guide for Poornima University',
                color: 'from-violet-500/20 to-violet-500/5'
              },
              {
                title: 'Scholarship Guide',
                desc: 'All available scholarships and eligibility criteria',
                icon: Star,
                query: 'Tell me about all scholarships available at Poornima University',
                color: 'from-amber-500/20 to-amber-500/5'
              },
              {
                title: 'Placement Report',
                desc: 'Latest placement statistics and top recruiters',
                icon: Trophy,
                query: 'Give me the latest placement report of Poornima University',
                color: 'from-green-500/20 to-green-500/5'
              }
            ].map((guide) => {
              const Icon = guide.icon;
              return (
                <button
                  key={guide.title}
                  onClick={() => handleQuickAction(guide.query)}
                  className={`text-left p-5 rounded-2xl bg-gradient-to-br ${guide.color} border border-white/5 hover:border-white/10 transition-all duration-300 group`}
                >
                  <Icon size={22} className="text-white/70 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white text-sm mb-1">{guide.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{guide.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-primary-400">
                    Open in AI Chat <ChevronRight size={12} />
                  </div>
                </button>
              );
            })}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
