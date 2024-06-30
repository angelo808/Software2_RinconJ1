const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
