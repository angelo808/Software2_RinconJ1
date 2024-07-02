const CalendarEvent = require('../models/calendarEventModel');

const createCalendarEvent = async (req, res) => {
  try {
    const { name, description, date, startHour, endHour, type, userId } = req.body;
    const newEvent = new CalendarEvent({ name, description, date, startHour, endHour, type, userId });
    await newEvent.save();
    res.status(200).json(newEvent);
  } catch (err) {
    console.error('Error creating calendar event:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const events = await CalendarEvent.find({ userId });
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const getCalendarEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await CalendarEvent.findById(id).populate('userId');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching event:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, startHour, endHour, type, userId } = req.body;
    const updatedEvent = await CalendarEvent.findByIdAndUpdate(
      id,
      { name, description, date, startHour, endHour, type, userId },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await CalendarEvent.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(deletedEvent);
  } catch (err) {
    console.error('Error deleting event:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCalendarEvent,
  getCalendarEventById,
  updateCalendarEvent,
  deleteCalendarEvent,
  getEventsByUserId,
};
