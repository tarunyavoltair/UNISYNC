const Student = require("../../database/models/Student");

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message
    });
  }
};

module.exports = {
  getStudents
};