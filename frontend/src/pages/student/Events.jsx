import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get, post } from "../../services/api";

function Events() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await get("/events");
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      }
    };

    loadEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        setMessage("Please login again.");
        return;
      }

      const response = await post(`/events/${eventId}/register`, {
        studentId: user.id,
      });

      setMessage(response.message);

      // Update attendee count immediately
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event._id === eventId
            ? {
                ...event,
                attendees: response.event.attendees,
              }
            : event
        )
      );
    } catch (error) {
  console.error("Registration failed:", error);
  setMessage(error.message);
}
  };

  const filteredEvents = events.filter(
    (event) =>
      event.eventName.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>📅 Events & Activities</h1>

          <p>
            Discover campus events, register for activities and build your
            Event Passport.
          </p>

          {message && <p>{message}</p>}

          <div className="event-search">
            <input
              type="text"
              placeholder="Search events or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <section className="events-section">
            <h2>Upcoming Events</h2>

            <div className="events-grid">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div className="event-card" key={event._id}>
                    <div className="event-icon">📅</div>

                    <h3>{event.eventName}</h3>

                    <p className="event-category">
                      {event.category}
                    </p>

                    <p>
                      <strong>📆 Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>

                    <p>
                      <strong>⏰ Time:</strong>{" "}
                      {event.startTime} - {event.endTime}
                    </p>

                    <p>
                      <strong>📍 Location:</strong>{" "}
                      {event.location}
                    </p>

                    <p>
                      {event.description ||
                        "No description available."}
                    </p>

                    <p>
                      <strong>🎯 XP Reward:</strong>{" "}
                      {event.xpReward} XP
                    </p>

                    <p>
                      <strong>👥 Attendees:</strong>{" "}
                      {event.attendees
                        ? event.attendees.length
                        : 0}
                      {event.maxAttendees
                        ? ` / ${event.maxAttendees}`
                        : ""}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleRegister(event._id)}
                    >
                      Register
                    </button>
                  </div>
                ))
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </section>

          <section className="event-passport">
            <h2>🎫 Event Passport</h2>

            <p>
              Attend campus events, check in using QR codes, earn XP and
              collect certificates for your participation.
            </p>

            <div className="passport-info">
              <div>
                <h3>0</h3>
                <p>Events Attended</p>
              </div>

              <div>
                <h3>0 XP</h3>
                <p>Event XP Earned</p>
              </div>

              <div>
                <h3>0</h3>
                <p>Certificates</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Events;