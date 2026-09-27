const express = require("express");
const router = express.Router();

const CampusLocation = require("../../database/models/CampusLocation");
const { protect } = require("../middleware/authMiddleware");

// Get all campus locations
router.get("/", protect, async (req, res) => {
  try {
    const locations = await CampusLocation.find().sort({
      name: 1,
    });

    res.status(200).json(locations);
  } catch (error) {
    console.error("Failed to fetch campus locations:", error);

    res.status(500).json({
      message: "Failed to fetch campus locations",
      error: error.message,
    });
  }
});

module.exports = router;