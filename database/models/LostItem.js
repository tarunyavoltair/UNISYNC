const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    dateLost: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    status: {
      type: String,
      enum: ["lost", "found", "claimed"],
      default: "lost",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LostItem", lostItemSchema);