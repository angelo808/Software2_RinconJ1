const CalendarEvent = require('../models/calendarEventModel');

// Crear un nuevo evento de calendario
exports.createCalendarEvent = async (req, res) => {
  const { name, description, date, startHour, endHour, type, userId } = req.body;

  try {
    const newEvent = new CalendarEvent({
      name,
      description,
      date,
      startHour,
      endHour,
      type,
      userId,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('Error creating calendar event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener un evento de calendario por ID
exports.getCalendarEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await CalendarEvent.findById(id).populate('userId', 'name email');
    if (!event) {
      return res.status(404).json({ error: 'Calendar event not found' });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching calendar event by ID:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Actualizar un evento de calendario por ID
exports.updateCalendarEvent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedEvent = await CalendarEvent.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Calendar event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Error updating calendar event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Eliminar un evento de calendario por ID
exports.deleteCalendarEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await CalendarEvent.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Calendar event not found' });
    }

    res.status(200).json({ message: 'Calendar event deleted successfully' });
  } catch (err) {
    console.error('Error deleting calendar event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener eventos de calendario por ID de usuario
exports.getEventsByUserId = async (req, res) => {
  const { userId } = req.query;

  try {
    const events = await CalendarEvent.find({ userId }).populate('userId', 'name email');
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching calendar events by user ID:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
