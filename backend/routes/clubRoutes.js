const express = require("express");

const router = express.Router();

const {
  getClubs,
  createClub
} = require("../controllers/clubController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getClubs);

router.post("/", protect, createClub);

module.exports = router;