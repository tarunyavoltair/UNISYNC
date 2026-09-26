const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Coding Club",
      description: "A club for coding and technology enthusiasts.",
      coordinator: "Arun Kumar"
    },
    {
      id: 2,
      name: "Photography Club",
      description: "A club for students interested in photography.",
      coordinator: "Priya Sharma"
    }
  ]);
});

module.exports = router;