const Comment = require('../models/commentModel');
const Post = require('../models/PostModel');

exports.createComment = async (req, res) => {
  try {
    const { author, text, postId } = req.body;
    const newComment = new Comment({ author, text, postId });
    await newComment.save();

    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

