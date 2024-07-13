const mongoose = require('mongoose');

const ds160QuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  score: Number,
});

const ds160TestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [ds160QuestionSchema],
  totalScore: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DS160Test', ds160TestSchema);
