const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  score: Number,
});

const interviewSimulationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [interviewQuestionSchema],
  totalScore: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InterviewSimulation', interviewSimulationSchema);
