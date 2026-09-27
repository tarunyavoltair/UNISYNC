const express = require("express");

const router = express.Router();

const {
  getFaculty
} = require("../controllers/facultyController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getFaculty);

module.exports = router;