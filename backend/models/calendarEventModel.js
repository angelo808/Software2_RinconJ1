const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  startHour: {
    type: Date,
    required: [true, 'Event start hour is required'],
  },
  endHour: {
    type: Date,
    required: [true, 'Event end hour is required'],
  },
  type: {
    type: String,
    required: [true, 'Event type is required'],
    enum: ['Entrevista', 'Pago', 'Cita', 'Meeting', 'Reminder', 'Task', 'Event'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;

