import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getAnalytics,
  getFAQs, createFAQ, updateFAQ, deleteFAQ,
  getNotices, createNotice, updateNotice, deleteNotice,
  getKnowledge, createKnowledge, updateKnowledge, deleteKnowledge
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/analytics', getAnalytics);

router.get('/faqs', getFAQs);
router.post('/faqs', createFAQ);
router.put('/faqs/:id', updateFAQ);
router.delete('/faqs/:id', deleteFAQ);

router.get('/notices', getNotices);
router.post('/notices', createNotice);
router.put('/notices/:id', updateNotice);
router.delete('/notices/:id', deleteNotice);

router.get('/knowledge', getKnowledge);
router.post('/knowledge', createKnowledge);
router.put('/knowledge/:id', updateKnowledge);
router.delete('/knowledge/:id', deleteKnowledge);

export default router;
