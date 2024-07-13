const express = require('express');
const router = express.Router();
const ds160TestController = require('../controllers/ds160TestController');

router.post('/', ds160TestController.createDS160Test);
router.get('/:userId', ds160TestController.getDS160TestResults);

module.exports = router;
