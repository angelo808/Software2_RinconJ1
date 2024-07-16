
const express = require('express');
const router = express.Router();
const calendarEventController = require('../controllers/calendarEventController');

// Rutas para eventos del calendario
router.post('', calendarEventController.createCalendarEvent);
router.get('/:id', calendarEventController.getCalendarEventById);
router.put('/:id', calendarEventController.updateCalendarEvent);
router.delete('/:id', calendarEventController.deleteCalendarEvent);
router.get('/user/:userId', calendarEventController.getEventsByUserId);
router.post('/user/interview', calendarEventController.assignInterview);

module.exports = router;
