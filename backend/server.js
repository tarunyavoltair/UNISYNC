const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const lostFoundRoutes = require("./routes/lostFoundRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const clubRoutes = require("./routes/clubRoutes");
const hallRoutes = require("./routes/hallRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/lost-found", lostFoundRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({ message: "UNISYNC Backend API is running!" });
});

app.listen(PORT, () => {
  console.log(`UNISYNC Backend running on http://localhost:${PORT}`);
});