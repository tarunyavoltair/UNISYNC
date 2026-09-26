const express = require("express");
const router = express.Router();

const {
  getHalls
} = require("../controllers/hallController");

router.get("/", getHalls);

module.exports = router;