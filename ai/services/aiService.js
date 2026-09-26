const Faculty = require("../../database/models/Faculty");
const Event = require("../../database/models/Event");
const Club = require("../../database/models/Club");
const Hall = require("../../database/models/Hall");
const LostItem = require("../../database/models/LostItem");

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
  if (question.includes("club") || question.includes("society")) {
    const clubs = await Club.find()
      .populate("facultyCoordinator", "name")
      .populate("president", "name");

    if (clubs.length === 0) {
      return "No clubs are currently available.";
    }

    const clubList = clubs
      .map(
        (club) =>
          `${club.clubName} - ${club.category} - Faculty Coordinator: ${
            club.facultyCoordinator?.name || "N/A"
          } - President: ${club.president?.name || "N/A"}`
      )
      .join("\n");

    return `Here are the campus clubs:\n${clubList}`;
  }

  // Hall-related questions
  if (question.includes("hall") || question.includes("booking")) {
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

  return "I'm UNISYNC AI. I can help you find campus services, events, clubs, faculty, halls, and Lost & Found information.";
};

module.exports = {
  generateAIResponse
};