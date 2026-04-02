import mongoose from 'mongoose';

const knowledgeEntrySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'university_overview', 'admissions', 'eligibility', 'courses', 'departments',
      'fee_structure', 'scholarships', 'hostel', 'placements', 'facilities',
      'faculty', 'contact', 'rankings', 'events', 'phd_research',
      'transport', 'library', 'internships', 'alumni', 'examinations'
    ]
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

knowledgeEntrySchema.index({ category: 1, tags: 1 });
knowledgeEntrySchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.model('KnowledgeEntry', knowledgeEntrySchema);
