import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Body is required']
  },
  category: {
    type: String,
    enum: ['academic', 'admission', 'exam', 'event', 'placement', 'general'],
    default: 'general'
  },
  date: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Notice', noticeSchema);
