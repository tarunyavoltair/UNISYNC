const express = require("express");

const router = express.Router();

const {
  getHalls
} = require("../controllers/hallController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getHalls);

module.exports = router;