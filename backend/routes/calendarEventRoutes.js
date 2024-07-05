const express = require('express');
const router = express.Router();
const calendarEventController = require('../controllers/calendarEventController');

// Rutas para eventos del calendario
router.post('/events', calendarEventController.createCalendarEvent);
router.get('/events/:id', calendarEventController.getCalendarEventById);
router.put('/events/:id', calendarEventController.updateCalendarEvent);
router.delete('/events/:id', calendarEventController.deleteCalendarEvent);
router.get('/events/user/:userId', calendarEventController.getEventsByUserId);

module.exports = router;

