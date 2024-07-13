const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Crear un nuevo comentario
exports.createComment = async (req, res) => {
  const { author, text, postId } = req.body;

  try {
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = new Comment({ author, text, postId });
    const savedComment = await newComment.save();
    
    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Error creating comment:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener comentarios por ID de publicación
exports.getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId });
    if (!comments) {
      return res.status(404).json({ error: 'Comments not found' });
    }

    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments by post ID:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



