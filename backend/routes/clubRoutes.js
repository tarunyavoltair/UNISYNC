const express = require("express");

const router = express.Router();

const {
  getClubs
} = require("../controllers/clubController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getClubs);

module.exports = router;