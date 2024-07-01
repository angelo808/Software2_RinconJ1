const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
  try {
    const { author, text, postId } = req.body;
    const newComment = new Comment({ author, text, postId });
    await newComment.save();

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

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


