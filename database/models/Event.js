const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },

    location: {
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

    image: {
      type: String,
    },

    // Students who registered for the event
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // Students who actually attended / checked in
    attendedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    maxAttendees: {
      type: Number,
    },

    xpReward: {
      type: Number,
      default: 0,
    },

    // Whether students who attend this event can receive a certificate
    certificateEnabled: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);