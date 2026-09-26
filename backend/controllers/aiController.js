const { generateAIResponse } = require("../../ai/services/aiService");

const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await generateAIResponse(message);

    res.status(200).json({
      message,
      response
    });
  } catch (error) {
    res.status(500).json({
      message: "AI request failed",
      error: error.message
    });
  }
};

module.exports = {
  askAI
};