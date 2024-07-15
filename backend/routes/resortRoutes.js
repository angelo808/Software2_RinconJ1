const express = require('express');
const router = express.Router();
const resortController = require('../controllers/resortController');


router.get('/', resortController.getResorts);
router.post('/', resortController.createResort);

module.exports = router;