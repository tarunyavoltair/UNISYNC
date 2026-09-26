const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Dr. Anitha Kumar",
      department: "Computer Science",
      room: "Block A - 201",
      availability: "Available"
    },
    {
      id: 2,
      name: "Dr. Ravi Kumar",
      department: "Information Technology",
      room: "Block B - 105",
      availability: "Unavailable"
    }
  ]);
});

module.exports = router;