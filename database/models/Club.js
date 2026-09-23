const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    clubName: {
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

    facultyCoordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },

    president: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    meetingLocation: {
      type: String,
    },

    meetingTime: {
      type: String,
    },

    logo: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Club", clubSchema);