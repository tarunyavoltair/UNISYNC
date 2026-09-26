const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      hallName: "Main Auditorium",
      capacity: 500,
      location: "Block A",
      availability: "Available"
    },
    {
      id: 2,
      hallName: "Seminar Hall",
      capacity: 150,
      location: "Block B",
      availability: "Booked"
    }
  ]);
});

module.exports = router;