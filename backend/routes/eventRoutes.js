const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Tech Fest 2026",
      date: "2026-10-10",
      location: "Main Auditorium",
      organizer: "Coding Club"
    },
    {
      id: 2,
      name: "Cultural Fest 2026",
      date: "2026-10-20",
      location: "College Ground",
      organizer: "Cultural Club"
    }
  ]);
});

module.exports = router;