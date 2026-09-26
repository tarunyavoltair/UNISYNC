const LostItem = require("../../database/models/LostItem");

// GET all lost and found items
const getLostFoundItems = async (req, res) => {
  try {
    const items = await LostItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lost and found items",
      error: error.message
    });
  }
};

// POST create a lost/found item
const createLostFoundItem = async (req, res) => {
  try {
    const newItem = await LostItem.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create lost and found item",
      error: error.message
    });
  }
};

module.exports = {
  getLostFoundItems,
  createLostFoundItem
};
