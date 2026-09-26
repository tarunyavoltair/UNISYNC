const Faculty = require("../../database/models/Faculty");

// GET all faculty
const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch faculty",
      error: error.message
    });
  }
};

module.exports = {
  getFaculty
};