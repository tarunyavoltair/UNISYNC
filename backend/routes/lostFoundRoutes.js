const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      item: "Black Wallet",
      location: "Library",
      status: "Lost"
    },
    {
      id: 2,
      item: "Blue Water Bottle",
      location: "Block A",
      status: "Found"
    }
  ]);
});

module.exports = router;