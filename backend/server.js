require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("../database/config/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

const lostFoundRoutes = require("./routes/lostFoundRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const clubRoutes = require("./routes/clubRoutes");
const hallRoutes = require("./routes/hallRoutes");
const eventRoutes = require("./routes/eventRoutes");
const studentRoutes = require("./routes/studentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/lost-found", lostFoundRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "UNISYNC Backend API is running!" });
});

app.listen(PORT, () => {
  console.log(`UNISYNC Backend running on http://localhost:${PORT}`);
});