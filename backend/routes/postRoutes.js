const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rutas para publicaciones
router.get('/filter/:agency', postController.getPosts);
router.post('/', postController.uploadImg, postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.post('/:id/comment', postController.uploadComment);
router.get('/:id/comment', postController.getComments);
router.delete('/:id/comment', postController.deleteComment);
router.put('/:id/comment/report', postController.reportComment);
router.delete('/:id', postController.deletePost);

// Rutas para likes y dislikes en publicaciones
router.put('/:id/reactions', postController.updateReactions);

module.exports = router;

