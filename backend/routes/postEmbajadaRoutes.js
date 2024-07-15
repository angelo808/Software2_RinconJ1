const express = require('express');
const router = express.Router();
const postEmbajadaController = require('../controllers/postEmbajadaController');

// Rutas para publicaciones
router.get('/filter/:employer', postEmbajadaController.getPosts);
router.post('/', postEmbajadaController.createPost[0],postEmbajadaController.createPost[1]);
router.get('/:id', postEmbajadaController.getPostById);
router.put('/:id', postEmbajadaController.updatePost);
router.post('/:id/comment', postEmbajadaController.uploadComment);
router.get('/:id/comment', postEmbajadaController.getComments);
router.delete('/:id/comment', postEmbajadaController.deleteComment);
router.put('/:id/comment/report', postEmbajadaController.reportComment);
router.delete('/:id', postEmbajadaController.deletePost);

// Rutas para likes y dislikes en publicaciones
router.put('/:id/reactions', postEmbajadaController.updateReactions);

module.exports = router;

