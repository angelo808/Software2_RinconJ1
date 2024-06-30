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

// Get a calendar event by ID
const getCalendarEventById = async (id) => {
  return await prisma.calendarEvent.findUnique({
    where: { id: parseInt(id) },
    include: { user: true }, // Include the user who created the event
  });
};

// Update a calendar event
const updateCalendarEvent = async (id, event) => {
  const { name, description, date, startHour, endHour, type, userId } = event;
  return await prisma.calendarEvent.update({
    where: { id: parseInt(id) },
    data: {
      name,
      description,
      date,
      startHour,
      endHour,
      type,
      userId,
    },
  });
};

// Delete a calendar event
const deleteCalendarEvent = async (id) => {
  return await prisma.calendarEvent.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  createCalendarEvent,
  getCalendarEventById,
  updateCalendarEvent,
  deleteCalendarEvent,
};
