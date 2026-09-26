const Club = require("../../database/models/Club");

// GET all clubs
const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate("facultyCoordinator", "name department")
      .populate("president", "name department")
      .populate("members", "name department");

    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch clubs",
      error: error.message
    });
  }
};

module.exports = {
  getClubs
};