import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { post } from "../../services/api";

function StudentAI() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      return;
    }

    const userQuestion = question.trim();

    // Add user's question to chat
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      // Send "message" because the backend expects req.body.message
      const response = await post("/ai", {
        message: userQuestion,
      });

      // Backend currently returns { message, response }
      const aiMessage =
        response?.response ||
        response?.answer ||
        response?.message ||
        "Sorry, I could not find an answer.";

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: aiMessage,
        },
      ]);
    } catch (error) {
      console.error("AI API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text:
            "Unable to connect to UNISYNC AI right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>🤖 UNISYNC AI Assistant</h1>

          <p>
            Ask questions about your campus, events, clubs, facilities and
            student activities.
          </p>

          <section className="ai-assistant">
            <div className="ai-header">
              <div className="ai-icon">🤖</div>

              <div>
                <h2>How can I help you?</h2>
                <p>Your smart campus assistant</p>
              </div>
            </div>

            <div className="ai-suggestions">
              <button
                type="button"
                onClick={() =>
                  setQuestion("What events are happening today?")
                }
              >
                📅 Today's events
              </button>

              <button
                type="button"
                onClick={() =>
                  setQuestion("Where is the computer lab?")
                }
              >
                🗺️ Find a location
              </button>

              <button
                type="button"
                onClick={() =>
                  setQuestion("What clubs can I join?")
                }
              >
                🏛️ Find clubs
              </button>

              <button
                type="button"
                onClick={() =>
                  setQuestion("Where can I find a faculty member?")
                }
              >
                👩‍🏫 Find faculty
              </button>
            </div>

            <div className="ai-chat">
              {messages.length === 0 ? (
                <div className="ai-welcome">
                  <span>🤖</span>

                  <h3>Hello! I'm UNISYNC AI</h3>

                  <p>
                    Ask me anything about your campus.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    className={`chat-message ${message.type}`}
                    key={index}
                  >
                    <div className="chat-avatar">
                      {message.type === "user" ? "👤" : "🤖"}
                    </div>

                    <div className="chat-bubble">
                      {message.text}
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="chat-message ai">
                  <div className="chat-avatar">🤖</div>

                  <div className="chat-bubble">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <form
              className="ai-input-area"
              onSubmit={handleAskAI}
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask UNISYNC AI something..."
                disabled={loading}
              />

              <button type="submit" disabled={loading}>
                {loading ? "..." : "Ask AI"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default StudentAI;