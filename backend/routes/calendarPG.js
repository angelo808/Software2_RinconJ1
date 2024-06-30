const express = require("express");
const router = express.Router();
const calendarEventController = require("../controllers/calendarPGController");

// CalendarEvent routes
router.post("/events", calendarEventController.createCalendarEvent);
router.get("/events/:id", calendarEventController.getCalendarEventById);
router.put("/events/:id", calendarEventController.updateCalendarEvent);
router.delete("/events/:id", calendarEventController.deleteCalendarEvent);

module.exports = router;
