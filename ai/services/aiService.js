const Faculty = require("../../database/models/Faculty");
const Event = require("../../database/models/Event");
const Club = require("../../database/models/Club");
const Hall = require("../../database/models/Hall");
const LostItem = require("../../database/models/LostItem");
const Booking = require("../../database/models/Booking");
const Student = require("../../database/models/Student");

const generateAIResponse = async (message) => {
  if (!message || message.trim() === "") {
    return "Please ask me something about UNISYNC.";
  }

  const question = message.toLowerCase();

  // Faculty-related questions
  if (question.includes("faculty") || question.includes("teacher")) {
    const faculty = await Faculty.find();

    if (faculty.length === 0) {
      return "No faculty information is currently available.";
    }

    const facultyList = faculty
      .map(
        (member) =>
          `${member.name} - ${member.department} - Room ${
            member.roomNumber || "N/A"
          }`
      )
      .join("\n");

    return `Here are the faculty members:\n${facultyList}`;
  }

  // Event-related questions
  if (question.includes("event")) {
    const events = await Event.find();

    if (events.length === 0) {
      return "No events are currently available.";
    }

    const eventList = events
      .map(
        (event) =>
          `${event.eventName} - ${event.category} - ${event.location} - ${event.date.toDateString()}`
      )
      .join("\n");

    return `Here are the campus events:\n${eventList}`;
  }

  // Club-related questions
  if (
  question.includes("club") ||
  question.includes("society") ||
  question.includes("member") ||
  question.includes("belong")
) {
    const clubs = await Club.find()
      .populate("facultyCoordinator", "name")
      .populate("president", "name")
      .populate("members", "name department year");

    if (clubs.length === 0) {
      return "No clubs are currently available.";
    }

    // Find a specific club by name
    const matchedClub = clubs.find((club) =>
      question.includes(club.clubName.toLowerCase())
    );

    if (matchedClub) {
      // Show members of a specific club
      if (
        question.includes("member") ||
        question.includes("members") ||
        question.includes("belong")
      ) {
        if (!matchedClub.members || matchedClub.members.length === 0) {
          return `${matchedClub.clubName} currently has no members listed.`;
        }

        const memberList = matchedClub.members
          .map(
            (member) =>
              `${member.name} - ${member.department} - Year ${member.year}`
          )
          .join("\n");

        return `Members of ${matchedClub.clubName}:\n${memberList}`;
      }

      // Show details of a specific club
      return `Club: ${matchedClub.clubName}
Category: ${matchedClub.category}
Faculty Coordinator: ${
        matchedClub.facultyCoordinator?.name || "N/A"
      }
President: ${matchedClub.president?.name || "N/A"}
Members: ${matchedClub.members?.length || 0}
Meeting Location: ${matchedClub.meetingLocation || "N/A"}
Meeting Time: ${matchedClub.meetingTime || "N/A"}`;
    }

    // Find clubs that a specific student belongs to
    const students = await Student.find();

    const matchedStudent = students.find((student) =>
      question.includes(student.name.toLowerCase())
    );

    if (
      matchedStudent &&
      (question.includes("club") ||
        question.includes("society") ||
        question.includes("belong"))
    ) {
      const studentClubs = clubs.filter((club) =>
        club.members?.some(
          (member) =>
            member._id.toString() === matchedStudent._id.toString()
        )
      );

      if (studentClubs.length === 0) {
        return `${matchedStudent.name} is not currently listed as a member of any club.`;
      }

      const clubList = studentClubs
        .map(
          (club) =>
            `${club.clubName} - ${club.category} - Meeting: ${
              club.meetingLocation || "N/A"
            } at ${club.meetingTime || "N/A"}`
        )
        .join("\n");

      return `Clubs of ${matchedStudent.name}:\n${clubList}`;
    }

    // Default: show all clubs
    const clubList = clubs
      .map(
        (club) =>
          `${club.clubName} - ${club.category} - Faculty Coordinator: ${
            club.facultyCoordinator?.name || "N/A"
          } - President: ${club.president?.name || "N/A"} - Members: ${
            club.members?.length || 0
          }`
      )
      .join("\n");

    return `Here are the campus clubs:\n${clubList}`;
  }

  // Booking-related questions
  if (question.includes("booking") || question.includes("booked")) {
    const bookings = await Booking.find()
      .populate("hall", "hallName")
      .populate("bookedBy", "name");

    if (bookings.length === 0) {
      return "No hall bookings are currently available.";
    }

    const bookingList = bookings
      .map(
        (booking) =>
          `${booking.eventName} - ${booking.hall?.hallName || "N/A"} - Booked by: ${
            booking.bookedBy?.name || "N/A"
          } - ${booking.date.toDateString()} - ${booking.startTime} to ${
            booking.endTime
          } - Status: ${booking.status}`
      )
      .join("\n");

    return `Here are the hall bookings:\n${bookingList}`;
  }

  // Hall-related questions
  if (question.includes("hall")) {
    const halls = await Hall.find();

    if (halls.length === 0) {
      return "No halls are currently available.";
    }

    const hallList = halls
      .map(
        (hall) =>
          `${hall.hallName} - ${hall.building} - Capacity: ${hall.capacity} - Availability: ${hall.availability}`
      )
      .join("\n");

    return `Here are the available halls:\n${hallList}`;
  }

  // Student-related questions
  if (
    question.includes("student") ||
    question.includes("students") ||
    question.includes("profile") ||
    question.includes("class") ||
    question.includes("xp") ||
    question.includes("department") ||
    question.includes("year")
  ) {
    const students = await Student.find();

    if (students.length === 0) {
      return "No student information is currently available.";
    }

    // Search for a specific student by name
    const matchedStudent = students.find((student) => {
      const studentName = student.name.toLowerCase();

      return question.includes(studentName);
    });

    if (matchedStudent) {
      return `Student: ${matchedStudent.name}
Department: ${matchedStudent.department}
Year: ${matchedStudent.year}
Section: ${matchedStudent.section || "N/A"}
XP: ${matchedStudent.xp}
Email: ${matchedStudent.email}`;
    }

    // Find students by department
    const matchedDepartment = students.filter((student) =>
      question.includes(student.department.toLowerCase())
    );

    if (matchedDepartment.length > 0) {
      const studentList = matchedDepartment
        .map(
          (student) =>
            `${student.name} - Year ${student.year} - ${
              student.section || "Section N/A"
            } - XP: ${student.xp}`
        )
        .join("\n");

      return `Students from ${matchedDepartment[0].department}:\n${studentList}`;
    }

    // Find students by year
    const yearMatch = question.match(/\b(year|yr)\s*(\d+)\b/);

    if (yearMatch) {
      const requestedYear = Number(yearMatch[2]);

      const yearStudents = students.filter(
        (student) => student.year === requestedYear
      );

      if (yearStudents.length === 0) {
        return `No students found in Year ${requestedYear}.`;
      }

      const studentList = yearStudents
        .map(
          (student) =>
            `${student.name} - ${student.department} - ${
              student.section || "Section N/A"
            } - XP: ${student.xp}`
        )
        .join("\n");

      return `Students in Year ${requestedYear}:\n${studentList}`;
    }

    // Find student with highest XP
    if (
      question.includes("highest xp") ||
      question.includes("most xp") ||
      question.includes("top xp")
    ) {
      const topStudent = students.reduce((highest, student) =>
        student.xp > highest.xp ? student : highest
      );

      return `${topStudent.name} has the highest XP with ${topStudent.xp} XP.`;
    }

    // Default: show all students
    const studentList = students
      .map(
        (student) =>
          `${student.name} - ${student.department} - Year ${student.year} - ${
            student.section || "Section N/A"
          } - XP: ${student.xp}`
      )
      .join("\n");

    return `Here are the students:\n${studentList}`;
  }

  // Lost & Found
  if (question.includes("lost") || question.includes("found")) {
    const items = await LostItem.find();

    if (items.length === 0) {
      return "No lost or found items are currently available.";
    }

    const itemList = items
      .map(
        (item) =>
          `${item.itemName} - ${item.category} - ${item.location} - Status: ${item.status}`
      )
      .join("\n");

    return `Here are the Lost & Found items:\n${itemList}`;
  }

  return "I'm UNISYNC AI. I can help you find campus services, events, clubs, faculty, halls, bookings, students, and Lost & Found information.";
};

module.exports = {
  generateAIResponse,
};