const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/posts', postController.getPosts);
router.post('/posts', postController.createPost);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.post('/posts/like', postController.likePost);
router.post('/posts/dislike', postController.dislikePost);

module.exports = router;
