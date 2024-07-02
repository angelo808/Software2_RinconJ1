const express = require('express');
const router = express.Router();
const calendarEventController = require('../controllers/calendarEventController');

router.post('/events', calendarEventController.createCalendarEvent);
router.get('/events/:id', calendarEventController.getCalendarEventById);
router.put('/events/:id', calendarEventController.updateCalendarEvent);
router.delete('/events/:id', calendarEventController.deleteCalendarEvent);
router.get('/events_by_user', calendarEventController.getEventsByUserId);

module.exports = router;