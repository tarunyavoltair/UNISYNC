const Hall = require("../../database/models/Hall");

// GET all halls
const getHalls = async (req, res) => {
  try {
    const halls = await Hall.find();

    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch halls",
      error: error.message
    });
  }
};

module.exports = {
  getHalls
};