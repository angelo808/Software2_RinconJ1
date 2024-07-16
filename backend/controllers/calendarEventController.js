const CalendarEvent = require('../models/calendarEventModel');
const { sendEmail, scheduleEmail } = require('../models/mailer'); // Asegúrate de ajustar la ruta según tu estructura de proyecto

// Crear un nuevo evento de calendario
exports.createCalendarEvent = async (req, res) => {
  const { name, description, date, startHour, endHour, type, userId, email } = req.body;

  try {
    const newEvent = new CalendarEvent({
      name,
      description,
      date,
      startHour,
      endHour,
      type,
      userId,
      email
    });

    const savedEvent = await newEvent.save();

    // Programar el envío de correo electrónico
    const subject = 'Notificación de Evento Creado';
    const text = `Hola, acabas de crear un evento llamado "${savedEvent.name}" programado para el día ${savedEvent.date} desde las ${savedEvent.startHour} hasta las ${savedEvent.endHour}.`;
    sendEmail(savedEvent.email, subject, text)
    scheduleEmail(savedEvent);

    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('Error creating calendar event:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Asignar entrevista con empleador
exports.assignInterview = async (req, res) => {
  const { employer, userId } = req.body;
  console.log(employer)
  let date = '';
  let start = '';
  let end = '';

  if (employer == 'Alta Peruvian') {
    date = new Date("2024-07-22T00:00:00Z");
    start = new Date("2024-07-22T12:00:00Z");
    end = new Date("2024-07-22T13:00:00Z");
  } else if (employer == 'Aspen Meadows Resort') {
    date = new Date("2024-07-23T00:00:00Z");
    start = new Date("2024-07-23T13:00:00Z");
    end = new Date("2024-07-23T14:00:00Z");
  } else if (employer == 'Cafe Rio Resort') {
    date = new Date("2024-07-24T00:00:00Z");
    start = new Date("2024-07-24T14:00:00Z");
    end = new Date("2024-07-24T15:00:00Z");
  } else if (employer == 'Crystal Mountain Resort') {
    date = new Date("2024-07-25T00:00:00Z");
    start = new Date("2024-07-25T15:00:00Z");
    end = new Date("2024-07-25T16:00:00Z");
  } else if (employer == 'Montage Big Sky') {
    date = new Date("2024-07-26T00:00:00Z");
    start = new Date("2024-07-26T16:00:00Z");
    end = new Date("2024-07-26T17:00:00Z");
  }
  
  try {
    await CalendarEvent.deleteOne({ userId, type: 'Entrevista' });

    const newEvent = new CalendarEvent({
      name : `Entrevista con empleador ${employer}`,
      date,
      startHour: start,
      endHour: end,
      type: 'Entrevista',
      userId,
      email: 'AutoAssigned'
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

    const subject = 'Notificación de Evento Actualizado';
    const text = `Hola, acabas de actualizar un evento llamado "${updatedEvent.name}" programado para el día ${updatedEvent.date} desde las ${updatedEvent.startHour} hasta las ${updatedEvent.endHour}.`;
    sendEmail(updatedEvent.email, subject, text);

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
  const { userId } = req.params;

  try {
    const events = await CalendarEvent.find({ userId });
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching calendar events by user ID:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
