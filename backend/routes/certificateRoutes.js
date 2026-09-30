const express = require("express");

const router = express.Router();

const {
  getStudentCertificates,
} = require("../controllers/certificateController");

const { protect } = require("../middleware/authMiddleware");

// Get certificates belonging to a student
router.get(
  "/student/:studentId",
  protect,
  getStudentCertificates
);

module.exports = router;