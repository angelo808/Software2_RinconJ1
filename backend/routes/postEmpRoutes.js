const express = require('express');
const router = express.Router();
const postEmpController = require('../controllers/postEmpController');

// Rutas para publicaciones
router.get('/filter/:employer', postEmpController.getPosts);
router.post('/', postEmpController.uploadImg, postEmpController.createPost);
router.get('/:id', postEmpController.getPostById);
router.put('/:id', postEmpController.updatePost);
router.post('/:id/comment', postEmpController.uploadComment);
router.get('/:id/comment', postEmpController.getComments);
router.delete('/:id/comment', postEmpController.deleteComment);
router.put('/:id/comment/report', postEmpController.reportComment);
router.put('/:id/report', postEmpController.reportPost);
router.delete('/:id', postEmpController.deletePost);

// Rutas para likes y dislikes en publicaciones
router.put('/:id/reactions', postEmpController.updateReactions);

module.exports = router;

