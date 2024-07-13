const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  start: {
    type: Date,
    required: [true, 'Start date and time are required'],
  },
  end: {
    type: Date,
    required: [true, 'End date and time are required'],
  },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


