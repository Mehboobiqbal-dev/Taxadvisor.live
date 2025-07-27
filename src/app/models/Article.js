import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  published: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  generated: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'generating', 'completed'],
    default: 'pending',
  },
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
