// controllers/postController.js
const Post = require('../models/PostModel');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.likePost = async (req, res) => {
    const { postId, userId } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      const existingReaction = post.reactions.find(r => r.user === userId);
  
      if (existingReaction) {
        if (existingReaction.reaction === 'like') {
          post.likes -= 1;
          post.reactions = post.reactions.filter(r => r.user !== userId);
        } else {
          post.dislikes -= 1;
          post.likes += 1;
          existingReaction.reaction = 'like';
        }
      } else {
        post.likes += 1;
        post.reactions.push({ user: userId, reaction: 'like' });
      }
  
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.dislikePost = async (req, res) => {
    const { postId, userId } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      const existingReaction = post.reactions.find(r => r.user === userId);
  
      if (existingReaction) {
        if (existingReaction.reaction === 'dislike') {
          post.dislikes -= 1;
          post.reactions = post.reactions.filter(r => r.user !== userId);
        } else {
          post.likes -= 1;
          post.dislikes += 1;
          existingReaction.reaction = 'dislike';
        }
      } else {
        post.dislikes += 1;
        post.reactions.push({ user: userId, reaction: 'dislike' });
      }
  
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  