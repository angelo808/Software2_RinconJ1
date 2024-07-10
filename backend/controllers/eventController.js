const Event = require('../models/Event');

const getEvents = async (req, res) => {
    const events = await Event.find();
    res.send(events);
};

const createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.send(event);
};

const updateEvent = async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(event);
};

const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.send({ message: 'Event deleted' });
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
