const express = require("express");
const router = express.Router();

const {
  getFaculty
} = require("../controllers/facultyController");

router.get("/", getFaculty);

module.exports = router;