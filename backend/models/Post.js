const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
  }
}, {
  timestamps: true
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
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
    required: [true, 'Agency is required'],
    trim: true,
  },
  reactions: [{
    user: {
      type: String,
      required: true,
    },
    reaction: {
      type: String,
      enum: ['like', 'dislike'],
      required: true,
    }
  }],
  comments : [commentSchema]
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

