const Post = require('../models/Post');

// Obtener todos los posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({agency: req.params.agency});
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Crear un nuevo post
exports.createPost = async (req, res) => {  
  const { title, content, author, image, agency } = req.body;

  if (!title || !content || !author || !agency) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    const newPost = new Post({ title, content, author, image, agency });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error('Error fetching post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Actualizar un post por ID
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image, agency } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = image || post.image;
    post.agency = agency || post.agency;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Eliminar un post por ID
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Manejar likes en un post
exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.likes = (post.likes || 0) + 1;
    post.reactions = [...(post.reactions || []), { user: userId, reaction: 'like' }];
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error liking post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Manejar dislikes en un post
exports.dislikePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.dislikes = (post.dislikes || 0) + 1;
    post.reactions = [...(post.reactions || []), { user: userId, reaction: 'dislike' }];
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error disliking post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  