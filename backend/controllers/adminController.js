const Student = require("../../database/models/Student");
const Faculty = require("../../database/models/Faculty");
const Club = require("../../database/models/Club");
const Event = require("../../database/models/Event");
const Hall = require("../../database/models/Hall");

const getAdminStats = async (req, res) => {
  try {
    const [
      studentCount,
      facultyCount,
      clubCount,
      eventCount,
      hallCount,
    ] = await Promise.all([
      Student.countDocuments(),
      Faculty.countDocuments(),
      Club.countDocuments(),
      Event.countDocuments(),
      Hall.countDocuments(),
    ]);

    res.status(200).json({
      students: studentCount,
      faculty: facultyCount,
      clubs: clubCount,
      events: eventCount,
      halls: hallCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminStats,
};