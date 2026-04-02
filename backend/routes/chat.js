import express from 'express';
import { protect } from '../middleware/auth.js';
import { sendMessage, getChatHistory, getChatById, deleteChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/message', protect, sendMessage);
router.get('/history', protect, getChatHistory);
router.get('/:id', protect, getChatById);
router.delete('/:id', protect, deleteChat);

export default router;
