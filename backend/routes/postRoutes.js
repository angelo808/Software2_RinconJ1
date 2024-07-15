const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rutas para publicaciones
router.get('/filter/:agency', postController.getPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Rutas para likes y dislikes en publicaciones
router.post('/posts/:id/like', postController.likePost);
router.post('/posts/:id/dislike', postController.dislikePost);

module.exports = router;

