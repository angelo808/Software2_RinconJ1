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
  authorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },  
  reportCount : {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const postEmbajadaSchema = new mongoose.Schema({
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
  authorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
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
  reportCount : {
    type: Number,
    default: 0
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

const PostEmbajada = mongoose.model('PostEmbajada', postEmbajadaSchema);
module.exports = PostEmbajada;

