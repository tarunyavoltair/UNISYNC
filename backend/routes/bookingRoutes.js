const express = require("express");

const router = express.Router();

const {
  getBookings,
  createBooking,
  approveBooking,
  rejectBooking,
} = require("../controllers/bookingController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Get all bookings
router.get("/", protect, getBookings);

// Create a booking
router.post("/", protect, createBooking);

// Approve a booking - admin only
router.put(
  "/:id/approve",
  protect,
  authorizeRoles("admin"),
  approveBooking
);

// Reject a booking - admin only
router.put(
  "/:id/reject",
  protect,
  authorizeRoles("admin"),
  rejectBooking
);

module.exports = router;