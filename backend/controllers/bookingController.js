const Booking = require("../../database/models/Booking");

// GET all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("hall", "hallName building location capacity")
      .populate("bookedBy", "name email department");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// POST create a booking
const createBooking = async (req, res) => {
  try {
    // Get the authenticated student's ID from the JWT
    const studentId = req.user.id;

    const bookingData = {
      ...req.body,
      bookedBy: studentId,
    };

    const newBooking = await Booking.create(bookingData);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// APPROVE booking
const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking approved successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve booking",
      error: error.message,
    });
  }
};

// REJECT booking
const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking rejected successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject booking",
      error: error.message,
    });
  }
};

module.exports = {
  getBookings,
  createBooking,
  approveBooking,
  rejectBooking,
};