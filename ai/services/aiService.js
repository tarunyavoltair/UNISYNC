const generateAIResponse = async (message) => {
  if (!message || message.trim() === "") {
    return "Please ask me something about UNISYNC.";
  }

  const question = message.toLowerCase();

  if (question.includes("lost") || question.includes("found")) {
    return "You can use the Lost & Found section to report or search for campus items.";
  }

  if (question.includes("faculty") || question.includes("teacher")) {
    return "You can use Faculty Locator to find faculty members, departments, rooms, and availability.";
  }

  if (question.includes("club")) {
    return "You can explore campus clubs and societies through the Clubs section.";
  }

  if (question.includes("hall") || question.includes("booking")) {
    return "You can check available halls and make a hall booking through Hall Booking.";
  }

  if (question.includes("event")) {
    return "You can explore upcoming campus events through the Events section.";
  }

  return "I'm UNISYNC AI. I can help you find campus services, events, clubs, faculty, halls, and Lost & Found information.";
};

module.exports = {
  generateAIResponse
};