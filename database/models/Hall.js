const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    hallName: {
      type: String,
      required: true,
    },

    building: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    facilities: {
      type: [String],
      default: [],
    },

    availability: {
      type: String,
      enum: ["available", "occupied", "maintenance"],
      default: "available",
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hall", hallSchema);