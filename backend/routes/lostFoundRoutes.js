const express = require("express");
const router = express.Router();

const {
  getLostFoundItems,
  createLostFoundItem
} = require("../controllers/lostFoundController");

router.get("/", getLostFoundItems);
router.post("/", createLostFoundItem);

module.exports = router;
