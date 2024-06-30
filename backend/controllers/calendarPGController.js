const prisma = require("../prismaClient");

// Create a new calendar event
const createCalendarEvent = async (req, res) => {
  try {
    const {
      nombre: name,
      descripcion: description,
      dia: date,
      hora_inicio: startHour,
      hora_fin: endHour,
      tipo: type,
      userId,
    } = req.body;

    const eventDate = new Date(date);
    const eventStartHour = new Date(`${date}T${startHour}:00Z`);
    const eventEndHour = new Date(`${date}T${endHour}:00Z`);

    console.log(eventStartHour, eventEndHour);

    const newEvent = await prisma.calendarEvent.create({
      data: {
        name,
        description,
        date: eventDate,
        startHour: eventStartHour,
        endHour: eventEndHour,
        type,
        user: {
          connect: { id: parseInt(userId) },
        },
      },
    });
    return res.status(200).json(newEvent);
  } catch (err) {
    console.error("Error creating calendar event:", err.message);
    throw new Error(`Error creating calendar event: ${err.message}`);
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;

    // console.log("Fetching events for user ID:", userId);

    const events = await prisma.calendarEvent.findMany({
      where: { userId: parseInt(userId) },
    });

    // console.log("Events fetched:", events);

    return res.status(200).json(events);
  } catch (err) {
    // console.error("Error fetching events:", err.message);
    throw new Error(`Error fetching events: ${err.message}`);
  }
};

// Get a calendar event by ID
const getCalendarEventById = async (id) => {
  return await prisma.calendarEvent.findUnique({
    where: { id: parseInt(id) },
    include: { user: true }, // Include the user who created the event
  });
};

// Update a calendar event
const updateCalendarEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = req.body;

    const {
      nombre: name,
      descripcion: description,
      dia: date,
      hora_inicio: startHour,
      hora_fin: endHour,
      tipo: type,
      userId,
    } = event;

    const eventDate = new Date(date);
    const eventStartHour = new Date(`${date}T${startHour}:00Z`);
    const eventEndHour = new Date(`${date}T${endHour}:00Z`);

    const updatedEvent = await prisma.calendarEvent.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        date: eventDate,
        startHour: eventStartHour,
        endHour: eventEndHour,
        type,
        user: {
          connect: { id: parseInt(userId) }, // Connect the user relationship correctly
        },
      },
    });
    res.status(200).json(updatedEvent);
  } catch (err) {
    // console.error("Error updating event:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a calendar event
const deleteCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting event with ID:", id);

    const deletedEvent = await prisma.calendarEvent.delete({
      where: { id: parseInt(id, 10) },
    });

    console.log("Event deleted:", deletedEvent);

    return res.status(200).json(deletedEvent);
  } catch (err) {
    console.error("Error deleting calendar event:", err.message);
    throw new Error(`Error deleting calendar event: ${err.message}`);
  }
};

module.exports = {
  createCalendarEvent,
  getCalendarEventById,
  updateCalendarEvent,
  deleteCalendarEvent,
  getEventsByUserId,
};
