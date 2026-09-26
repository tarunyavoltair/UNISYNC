const Faculty = require("../../database/models/Faculty");
const Event = require("../../database/models/Event");

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

  if (question.includes("lost") || question.includes("found")) {
    return "You can use the Lost & Found section to report or search for campus items.";
  }

  if (question.includes("club")) {
    return "You can explore campus clubs and societies through the Clubs section.";
  }

  if (question.includes("hall") || question.includes("booking")) {
    return "You can check available halls and make a hall booking through Hall Booking.";
  }

  return "I'm UNISYNC AI. I can help you find campus services, events, clubs, faculty, halls, and Lost & Found information.";
};

module.exports = {
  generateAIResponse
};