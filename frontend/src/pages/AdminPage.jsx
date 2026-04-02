import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, LogOut, Users, MessageSquare, BookOpen, Bell,
  Plus, Pencil, Trash2, X, Check, AlertCircle, BarChart3,
  Database, ChevronDown, Search, FileText
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const KNOWLEDGE_CATEGORIES = [
  'university_overview', 'admissions', 'eligibility', 'courses', 'departments',
  'fee_structure', 'scholarships', 'hostel', 'placements', 'facilities',
  'faculty', 'contact', 'rankings', 'events', 'phd_research',
  'transport', 'library', 'internships', 'alumni', 'examinations'
];

const FAQ_CATEGORIES = ['admissions', 'courses', 'fees', 'hostel', 'placements', 'scholarships', 'general', 'facilities', 'examinations'];

const Modal = ({ open, title, onClose, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass-strong rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState({ totalUsers: 0, totalChats: 0, totalFaqs: 0, totalNotices: 0 });
  const [faqs, setFaqs] = useState([]);
  const [notices, setNotices] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [modal, setModal] = useState({ open: false, type: '', data: null });
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (activeTab === 'faqs') fetchFAQs();
    if (activeTab === 'notices') fetchNotices();
    if (activeTab === 'knowledge') fetchKnowledge();
  }, [activeTab]);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/admin/analytics');
      setAnalytics(res.data.data);
    } catch {}
  };

  const fetchFAQs = async () => {
    try {
      const res = await api.get('/admin/faqs');
      setFaqs(res.data.faqs);
    } catch {}
  };

  const fetchNotices = async () => {
    try {
      const res = await api.get('/admin/notices');
      setNotices(res.data.notices);
    } catch {}
  };

  const fetchKnowledge = async () => {
    try {
      const res = await api.get('/admin/knowledge');
      setKnowledge(res.data.entries);
    } catch {}
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const openModal = (type, data = null) => {
    setFormData(data || {});
    setModal({ open: true, type, data });
  };

  const closeModal = () => {
    setModal({ open: false, type: '', data: null });
    setFormData({});
  };

  const handleSaveFAQ = async () => {
    setLoading(true);
    try {
      if (modal.data?._id) {
        await api.put(`/admin/faqs/${modal.data._id}`, formData);
        showMessage('success', 'FAQ updated successfully');
      } else {
        await api.post('/admin/faqs', formData);
        showMessage('success', 'FAQ created successfully');
      }
      fetchFAQs();
      closeModal();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to save FAQ');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFAQ = async (id) => {
    try {
      await api.delete(`/admin/faqs/${id}`);
      setFaqs(prev => prev.filter(f => f._id !== id));
      showMessage('success', 'FAQ deleted');
    } catch {
      showMessage('error', 'Failed to delete FAQ');
    }
  };

  const handleSaveNotice = async () => {
    setLoading(true);
    try {
      if (modal.data?._id) {
        await api.put(`/admin/notices/${modal.data._id}`, formData);
        showMessage('success', 'Notice updated');
      } else {
        await api.post('/admin/notices', formData);
        showMessage('success', 'Notice created');
      }
      fetchNotices();
      closeModal();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to save notice');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await api.delete(`/admin/notices/${id}`);
      fetchNotices();
      showMessage('success', 'Notice deleted');
    } catch {
      showMessage('error', 'Failed to delete');
    }
  };

  const handleSaveKnowledge = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags
      };
      if (modal.data?._id) {
        await api.put(`/admin/knowledge/${modal.data._id}`, payload);
        showMessage('success', 'Knowledge entry updated');
      } else {
        await api.post('/admin/knowledge', payload);
        showMessage('success', 'Knowledge entry created');
      }
      fetchKnowledge();
      closeModal();
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKnowledge = async (id) => {
    try {
      await api.delete(`/admin/knowledge/${id}`);
      fetchKnowledge();
      showMessage('success', 'Entry deleted');
    } catch {
      showMessage('error', 'Failed to delete');
    }
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'faqs', label: 'FAQs', icon: MessageSquare },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
  ];

  const inputClass = "w-full px-3 py-2.5 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-colors border border-white/10 focus:border-primary-500/50 bg-white/5";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5";

  return (
    <div className="min-h-screen bg-dark">
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}>
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">PU Assistant <span className="gradient-text">Admin</span></h1>
            <p className="text-xs text-gray-500">Poornima University</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
          <span className="text-gray-700">|</span>
          <span className="text-xs text-gray-400">{user?.name}</span>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-2 rounded-xl p-4 mb-6 text-sm ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}
            >
              {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
                style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' } : {}}
              >
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Students', value: analytics.totalUsers, icon: Users, color: 'from-violet-500/20' },
                { label: 'AI Conversations', value: analytics.totalChats, icon: MessageSquare, color: 'from-cyan-500/20' },
                { label: 'Active FAQs', value: analytics.totalFaqs, icon: BookOpen, color: 'from-emerald-500/20' },
                { label: 'Active Notices', value: analytics.totalNotices, icon: Bell, color: 'from-amber-500/20' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`rounded-2xl p-5 bg-gradient-to-br ${stat.color} to-transparent border border-white/5`}>
                    <Icon size={20} className="text-white/60 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-primary-400" /> Quick Actions
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'Add New FAQ', action: () => { setActiveTab('faqs'); openModal('faq'); } },
                    { label: 'Post New Notice', action: () => { setActiveTab('notices'); openModal('notice'); } },
                    { label: 'Add Knowledge Entry', action: () => { setActiveTab('knowledge'); openModal('knowledge'); } },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={action.action}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl glass-strong hover:border-primary-500/30 transition-all text-sm text-gray-300 hover:text-white"
                    >
                      {action.label}
                      <ChevronDown size={14} className="-rotate-90" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-primary-400" /> Platform Info
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'AI Model', value: 'Google Gemini 1.5 Flash' },
                    { label: 'Knowledge Categories', value: '20 Categories' },
                    { label: 'University', value: 'Poornima University, Jaipur' },
                    { label: 'Platform Status', value: '🟢 Operational' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">{label}</span>
                      <span className="text-white font-medium text-xs">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'faqs' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl text-sm glass border border-white/10 text-white placeholder-gray-600 outline-none"
                />
              </div>
              <button onClick={() => openModal('faq')} className="btn-primary text-sm py-2 px-4">
                <Plus size={14} /> Add FAQ
              </button>
            </div>

            <div className="space-y-3">
              {faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase())).map((faq) => (
                <div key={faq._id} className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300">{faq.category}</span>
                        {!faq.isActive && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">Inactive</span>}
                      </div>
                      <p className="text-white text-sm font-medium mb-1">{faq.question}</p>
                      <p className="text-gray-400 text-xs line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openModal('faq', faq)} className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDeleteFAQ(faq._id)} className="p-2 glass rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'notices' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">University Notices</h2>
              <button onClick={() => openModal('notice')} className="btn-primary text-sm py-2 px-4">
                <Plus size={14} /> Add Notice
              </button>
            </div>
            <div className="space-y-3">
              {notices.map((notice) => (
                <div key={notice._id} className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{notice.category}</span>
                        {notice.isPinned && <span className="text-xs">📌 Pinned</span>}
                      </div>
                      <p className="text-white text-sm font-medium mb-1">{notice.title}</p>
                      <p className="text-gray-400 text-xs line-clamp-2">{notice.body}</p>
                      <p className="text-gray-600 text-xs mt-1">{new Date(notice.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openModal('notice', notice)} className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDeleteNotice(notice._id)} className="p-2 glass rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'knowledge' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl text-sm glass border border-white/10 text-white placeholder-gray-600 outline-none"
                />
              </div>
              <button onClick={() => openModal('knowledge')} className="btn-primary text-sm py-2 px-4">
                <Plus size={14} /> Add Entry
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {knowledge.filter(k =>
                k.title.toLowerCase().includes(search.toLowerCase()) ||
                k.category.toLowerCase().includes(search.toLowerCase())
              ).map((entry) => (
                <div key={entry._id} className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 mb-2 inline-block">
                        {entry.category.replace('_', ' ')}
                      </span>
                      <p className="text-white text-sm font-medium mb-1">{entry.title}</p>
                      <p className="text-gray-400 text-xs line-clamp-2">{entry.content}</p>
                      {entry.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-1.5 py-0.5 rounded-md bg-white/5 text-gray-500">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openModal('knowledge', { ...entry, tags: entry.tags?.join(', ') })} className="p-2 glass rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDeleteKnowledge(entry._id)} className="p-2 glass rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Modal
        open={modal.open && modal.type === 'faq'}
        title={modal.data?._id ? 'Edit FAQ' : 'Add New FAQ'}
        onClose={closeModal}
      >
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={formData.category || 'general'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={inputClass + ' cursor-pointer'}
            >
              {FAQ_CATEGORIES.map(c => <option key={c} value={c} className="bg-dark">{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Question</label>
            <input
              type="text"
              value={formData.question || ''}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Enter the question"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Answer</label>
            <textarea
              value={formData.answer || ''}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Enter the answer"
              rows={4}
              className={inputClass + ' resize-none'}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 btn-secondary text-sm py-2.5 justify-center">Cancel</button>
            <button onClick={handleSaveFAQ} disabled={loading} className="flex-1 btn-primary text-sm py-2.5 justify-center disabled:opacity-50">
              {loading ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={modal.open && modal.type === 'notice'}
        title={modal.data?._id ? 'Edit Notice' : 'Add Notice'}
        onClose={closeModal}
      >
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={formData.category || 'general'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={inputClass + ' cursor-pointer'}
            >
              {['academic', 'admission', 'exam', 'event', 'placement', 'general'].map(c => (
                <option key={c} value={c} className="bg-dark">{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Notice title"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Body</label>
            <textarea
              value={formData.body || ''}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Notice content"
              rows={4}
              className={inputClass + ' resize-none'}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPinned || false}
              onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              className="w-4 h-4 accent-primary-500"
            />
            <span className="text-sm text-gray-300">Pin this notice</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 btn-secondary text-sm py-2.5 justify-center">Cancel</button>
            <button onClick={handleSaveNotice} disabled={loading} className="flex-1 btn-primary text-sm py-2.5 justify-center disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Notice'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={modal.open && modal.type === 'knowledge'}
        title={modal.data?._id ? 'Edit Knowledge Entry' : 'Add Knowledge Entry'}
        onClose={closeModal}
      >
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={formData.category || 'university_overview'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={inputClass + ' cursor-pointer'}
            >
              {KNOWLEDGE_CATEGORIES.map(c => <option key={c} value={c} className="bg-dark">{c.replace('_', ' ')}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Entry title"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Content</label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Detailed content for this topic"
              rows={6}
              className={inputClass + ' resize-none'}
            />
          </div>
          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags || ''}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. admission, btech, fees"
              className={inputClass}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={closeModal} className="flex-1 btn-secondary text-sm py-2.5 justify-center">Cancel</button>
            <button onClick={handleSaveKnowledge} disabled={loading} className="flex-1 btn-primary text-sm py-2.5 justify-center disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminPage;
