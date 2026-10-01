const express = require("express");

const router = express.Router();

const {
  getClubs,
  createClub
} = require("../controllers/clubController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get("/", protect, getClubs);

router.post(
  "/",
  protect,
  authorizeRoles("club-admin"),
  createClub
);

module.exports = router;
