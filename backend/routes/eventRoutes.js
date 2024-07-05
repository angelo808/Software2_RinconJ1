const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Rutas para eventos
router.get('/events', eventController.getEvents);
router.post('/events', eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;


