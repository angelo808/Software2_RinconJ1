const prisma = require("../prismaClient");

// Create a new calendar event
const createCalendarEvent = async (event) => {
  const { name, description, date, startHour, endHour, type, userId } = event;
  console.log(event);
  //   return await prisma.calendarEvent.create({
  //     data: {
  //       name,
  //       description,
  //       date,
  //       startHour,
  //       endHour,
  //       type,
  //       userId,
  //     },
  //   });
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
