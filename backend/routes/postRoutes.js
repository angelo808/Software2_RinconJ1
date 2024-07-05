const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rutas para publicaciones
router.get('/posts', postController.getPosts);
router.post('/posts', postController.createPost);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

// Rutas para likes y dislikes en publicaciones
router.post('/posts/:id/like', postController.likePost);
router.post('/posts/:id/dislike', postController.dislikePost);

module.exports = router;

