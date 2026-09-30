const Event = require("../../database/models/Event");
const Student = require("../../database/models/Student");

// GET all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email department")
      .populate("club", "clubName category")
      .populate("attendees", "name email studentId")
      .populate("attendedBy", "name email studentId");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message,
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
      error: error.message,
    });
  }
};

// REGISTER student for an event
const registerForEvent = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID is required.",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    // Prevent duplicate registration
    const alreadyRegistered = event.attendees.some(
      (attendee) => attendee.toString() === studentId
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "Student is already registered for this event.",
      });
    }

    // Check maximum capacity
    if (
      event.maxAttendees &&
      event.attendees.length >= event.maxAttendees
    ) {
      return res.status(400).json({
        message: "This event has reached maximum capacity.",
      });
    }

    event.attendees.push(studentId);

    await event.save();

    const updatedEvent = await Event.findById(event._id).populate(
      "attendees",
      "name email studentId"
    );

    res.status(200).json({
      message: "Successfully registered for the event.",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register for event.",
      error: error.message,
    });
  }
};

// CHECK-IN student for an event
const checkInToEvent = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID is required.",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found.",
      });
    }

    // Student must be registered first
    const isRegistered = event.attendees.some(
      (attendee) => attendee.toString() === studentId
    );

    if (!isRegistered) {
      return res.status(400).json({
        message: "Student is not registered for this event.",
      });
    }

    // Prevent duplicate check-in
    const alreadyCheckedIn = event.attendedBy.some(
      (student) => student.toString() === studentId
    );

    if (alreadyCheckedIn) {
      return res.status(400).json({
        message: "Student has already checked in.",
      });
    }

    // Add student to attendance list
    event.attendedBy.push(studentId);

    await event.save();

    // Award XP
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    student.xp += event.xpReward || 0;

    await student.save();

    res.status(200).json({
      message: "Check-in successful. XP awarded.",
      xpAwarded: event.xpReward || 0,
      totalXP: student.xp,
    });
  } catch (error) {
    console.error("Event check-in error:", error);

    res.status(500).json({
      message: "Failed to check in for event.",
      error: error.message,
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  registerForEvent,
  checkInToEvent,
};