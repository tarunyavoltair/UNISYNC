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
      error: error.message
    });
  }
};

// POST create a booking
const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create booking",
      error: error.message
    });
  }
};

module.exports = {
  getBookings,
  createBooking
};