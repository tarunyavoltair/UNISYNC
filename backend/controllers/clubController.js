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

// CREATE a new club
const createClub = async (req, res) => {
  try {
    const {
      clubName,
      description,
      category,
      facultyCoordinator,
      president,
      members,
      meetingLocation,
      meetingTime,
      logo,
      isActive
    } = req.body;

    if (!clubName || !category) {
      return res.status(400).json({
        message: "Club name and category are required."
      });
    }

    const club = await Club.create({
      clubName,
      description,
      category,
      facultyCoordinator,
      president,
      members: members || [],
      meetingLocation,
      meetingTime,
      logo,
      isActive: isActive !== undefined ? isActive : true
    });

    const populatedClub = await Club.findById(club._id)
      .populate("facultyCoordinator", "name department")
      .populate("president", "name department")
      .populate("members", "name department");

    res.status(201).json({
      message: "Club created successfully",
      club: populatedClub
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create club",
      error: error.message
    });
  }
};

module.exports = {
  getClubs,
  createClub
};