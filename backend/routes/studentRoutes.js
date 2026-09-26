const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Harini Sivakumar",
      department: "Computer Science",
      year: 3
    },
    {
      id: 2,
      name: "Lavanya",
      department: "Information Technology",
      year: 3
    }
  ]);
});

module.exports = router;
