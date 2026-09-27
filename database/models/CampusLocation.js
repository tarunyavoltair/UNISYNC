const mongoose = require("mongoose");

const campusLocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "📍",
    },
    description: {
      type: String,
    },
    building: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CampusLocation",
  campusLocationSchema
);