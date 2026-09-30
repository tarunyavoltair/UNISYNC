require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const mongoose = require("mongoose");
const connectDB = require("../config/db");

const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Club = require("../models/Club");
const Hall = require("../models/Hall");
const CampusLocation = require("../models/CampusLocation");
const bcrypt = require("bcrypt");

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing sample data
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Club.deleteMany({});
    await Hall.deleteMany({});
    await CampusLocation.deleteMany({});

    // Students and Admin
    const students = await Student.insertMany([
      {
        studentId: "STU001",
        name: "Arun Kumar",
        password: await bcrypt.hash("arun123", 10),
        email: "arun@unisync.com",
        department: "Computer Science",
        year: 3,
        section: "A",
        phone: "9876543210",
        xp: 120,
        badges: ["Early Bird", "Event Explorer"],
        role: "student",
      },
      {
        studentId: "STU002",
        name: "Priya Sharma",
        password: await bcrypt.hash("priya123", 10),
        email: "priya@unisync.com",
        department: "Information Technology",
        year: 2,
        section: "B",
        phone: "9876543211",
        xp: 250,
        badges: ["Club Member", "Event Explorer"],
        role: "student",
      },
      {
        studentId: "ADM001",
        name: "UNISYNC Admin",
        password: await bcrypt.hash("admin123", 10),
        email: "admin@unisync.com",
        department: "Administration",
        year: 4,
        section: "A",
        phone: "9876543212",
        xp: 0,
        badges: [],
        role: "admin",
      },
    ]);

    // Faculty
    const faculty = await Faculty.insertMany([
      {
        facultyId: "FAC001",
        name: "Dr. Rajesh Kumar",
        department: "Computer Science",
        designation: "Professor",
        email: "rajesh@unisync.com",
        phone: "9876500001",
        roomNumber: "CS-201",
        building: "Computer Science Block",
        subjects: ["Database Management", "AI"],
        availability: "Available",
      },
      {
        facultyId: "FAC002",
        name: "Dr. Meena Devi",
        department: "Information Technology",
        designation: "Associate Professor",
        email: "meena@unisync.com",
        phone: "9876500002",
        roomNumber: "IT-105",
        building: "IT Block",
        subjects: ["Web Development", "Cloud Computing"],
        availability: "Busy",
      },
    ]);

    // Clubs
    await Club.insertMany([
      {
        clubName: "CodeCraft",
        description: "Programming and technology club",
        category: "Technology",
        facultyCoordinator: faculty[0]._id,
        president: students[0]._id,
        members: [students[0]._id, students[1]._id],
        meetingLocation: "Innovation Lab",
        meetingTime: "Friday 4:00 PM",
        isActive: true,
      },
      {
        clubName: "Pixel Arts",
        description: "Creative design and photography club",
        category: "Arts",
        facultyCoordinator: faculty[1]._id,
        president: students[1]._id,
        members: [students[1]._id],
        meetingLocation: "Arts Hall",
        meetingTime: "Wednesday 3:30 PM",
        isActive: true,
      },
    ]);

    // Halls
    await Hall.insertMany([
      {
        hallName: "Main Auditorium",
        building: "Main Block",
        location: "Ground Floor",
        capacity: 500,
        facilities: ["Projector", "Sound System", "AC"],
        availability: "available",
        description: "Large auditorium for major college events",
      },
      {
        hallName: "Seminar Hall A",
        building: "Academic Block",
        location: "First Floor",
        capacity: 120,
        facilities: ["Projector", "AC", "Whiteboard"],
        availability: "available",
        description: "Suitable for seminars and workshops",
      },
    ]);

    // Campus Locations
    await CampusLocation.insertMany([
      {
        name: "Library",
        icon: "📚",
        description:
          "Main college library with study and reference facilities",
        building: "Main Academic Block",
        floor: "Ground Floor",
        category: "Academic",
      },
      {
        name: "Computer Lab",
        icon: "💻",
        description:
          "Computer laboratory for practical sessions and projects",
        building: "Technology Block",
        floor: "2nd Floor",
        category: "Laboratory",
      },
      {
        name: "Cafeteria",
        icon: "🍴",
        description:
          "Student cafeteria serving food and refreshments",
        building: "Student Activity Block",
        floor: "Ground Floor",
        category: "Food",
      },
      {
        name: "Medical Room",
        icon: "🏥",
        description:
          "Campus medical facility for students and staff",
        building: "Administrative Block",
        floor: "Ground Floor",
        category: "Healthcare",
      },
      {
        name: "College Ground",
        icon: "🏟️",
        description:
          "Main sports and outdoor activity area",
        building: "Sports Complex",
        floor: "Ground",
        category: "Sports",
      },
      {
        name: "Parking",
        icon: "🚗",
        description:
          "Student and staff parking area",
        building: "North Campus Entrance",
        floor: "Ground",
        category: "Transport",
      },
    ]);

    console.log("Sample data inserted successfully!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error inserting sample data:", error.message);
    process.exit(1);
  }
};

seedData();

