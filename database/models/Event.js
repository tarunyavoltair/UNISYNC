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

    attendees: [
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