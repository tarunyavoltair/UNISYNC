const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    hall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hall",
      required: true,
    },

    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);