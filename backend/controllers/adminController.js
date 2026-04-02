import FAQ from '../models/FAQ.js';
import Notice from '../models/Notice.js';
import KnowledgeEntry from '../models/KnowledgeEntry.js';
import User from '../models/User.js';
import Chat from '../models/Chat.js';

export const getAnalytics = async (req, res) => {
  try {
    const [totalUsers, totalChats, totalFaqs, totalNotices] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Chat.countDocuments({ isActive: true }),
      FAQ.countDocuments({ isActive: true }),
      Notice.countDocuments({ isActive: true })
    ]);

    res.json({ success: true, data: { totalUsers, totalChats, totalFaqs, totalNotices } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found.' });
    res.json({ success: true, faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'FAQ deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isActive: true }).sort({ isPinned: -1, date: -1 });
    res.json({ success: true, notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found.' });
    res.json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Notice deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getKnowledge = async (req, res) => {
  try {
    const entries = await KnowledgeEntry.find({ isActive: true }).sort({ category: 1, updatedAt: -1 });
    res.json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createKnowledge = async (req, res) => {
  try {
    const entry = await KnowledgeEntry.create(req.body);
    res.status(201).json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateKnowledge = async (req, res) => {
  try {
    const entry = await KnowledgeEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ success: false, message: 'Knowledge entry not found.' });
    res.json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteKnowledge = async (req, res) => {
  try {
    await KnowledgeEntry.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Entry deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
