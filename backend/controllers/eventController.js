const Event = require("../../database/models/Event");

// GET all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email department")
      .populate("club", "clubName category");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message
    });
  }
};

// POST create an event
const createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event",
      error: error.message
    });
  }
};

module.exports = {
  getEvents,
  createEvent
};