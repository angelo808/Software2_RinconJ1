const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  agency: {
    type: String,
    required: true,
  },
  reactions: [{
    user: String,
    reaction: String,
  }],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
