const express = require("express");

const router = express.Router();

const {
  getEvents,
  createEvent,
  registerForEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

// Get all events
router.get("/", protect, getEvents);

// Create an event
router.post("/", protect, createEvent);

// Register a student for an event
router.post(
  "/:id/register",
  protect,
  registerForEvent
);

module.exports = router;