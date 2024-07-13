const Event = require('../models/Event');

// Obtener todos los eventos
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
  const { title, start, end } = req.body;

  try {
    const newEvent = new Event({ title, start, end });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('Error creating event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Actualizar un evento por ID
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, start, end } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { title, start, end }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Eliminar un evento por ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


