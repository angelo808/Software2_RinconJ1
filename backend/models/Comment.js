const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required'],
  },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

