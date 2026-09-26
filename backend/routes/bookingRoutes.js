const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      studentName: "Harini Sivakumar",
      hallName: "Main Auditorium",
      date: "2026-10-15",
      status: "Booked"
    },
    {
      id: 2,
      studentName: "Lavanya",
      hallName: "Seminar Hall",
      date: "2026-10-18",
      status: "Pending"
    }
  ]);
});

module.exports = router;
