const express = require("express");
const router = express.Router();

const {
  getLostFoundItems,
  createLostFoundItem
} = require("../controllers/lostFoundController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getLostFoundItems);
router.post("/", protect, createLostFoundItem);

module.exports = router;
