const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Rutas para comentarios
router.post('/comments', commentController.createComment);
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);

module.exports = router;


