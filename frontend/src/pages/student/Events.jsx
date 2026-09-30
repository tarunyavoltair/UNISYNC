import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get, post } from "../../services/api";
import EventQRCode from "../../components/EventQRCode";
import EventQRScanner from "../../components/EventQRScanner";

function Events() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

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
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser || !currentUser.id) {
        setMessage("Please login again.");
        return;
      }

      const response = await post(`/events/${eventId}/register`, {
        studentId: currentUser.id,
      });

      setMessage(response.message);

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

  const handleCheckIn = async (eventId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser || !currentUser.id) {
        setMessage("Please login again.");
        return;
      }

      const response = await post(`/events/${eventId}/check-in`, {
        studentId: currentUser.id,
      });

      setMessage(
        `${response.message} You earned ${response.xpAwarded} XP.`
      );

      const updatedEvents = await get("/events");
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Check-in failed:", error);
      setMessage(error.message);
    }
  };

  const isRegistered = (event) => {
    if (!user?.id || !event.attendees) {
      return false;
    }

    return event.attendees.some(
      (attendee) => attendee._id === user.id
    );
  };

  const isCheckedIn = (event) => {
    if (!user?.id || !event.attendedBy) {
      return false;
    }

    return event.attendedBy.some(
      (student) => student._id === user.id
    );
  };

  const filteredEvents = events.filter(
    (event) =>
      event.eventName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const attendedEvents = events.filter((event) =>
    isCheckedIn(event)
  );

  const eventXP = attendedEvents.reduce(
    (total, event) => total + (event.xpReward || 0),
    0
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

                    {/* Registration */}
                    <button
                      type="button"
                      onClick={() => handleRegister(event._id)}
                      disabled={isRegistered(event)}
                    >
                      {isRegistered(event)
                        ? "Registered ✓"
                        : "Register"}
                    </button>

                    {/* Manual Check-in */}
                    {isRegistered(event) && (
                      <button
                        type="button"
                        onClick={() => handleCheckIn(event._id)}
                        disabled={isCheckedIn(event)}
                        style={{ marginLeft: "10px" }}
                      >
                        {isCheckedIn(event)
                          ? "Checked In ✓"
                          : "Check In"}
                      </button>
                    )}

                    {/* Event QR Code */}
                    {isRegistered(event) && (
                      <EventQRCode eventId={event._id} />
                    )}
                  </div>
                ))
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </section>

          {/* QR Scanner */}
          <EventQRScanner />

          {/* Event Passport */}
          <section className="event-passport">
            <h2>🎫 Event Passport</h2>

            <p>
              Attend campus events, check in using QR codes, earn XP and
              collect certificates for your participation.
            </p>

            <div className="passport-info">
              <div>
                <h3>{attendedEvents.length}</h3>
                <p>Events Attended</p>
              </div>

              <div>
                <h3>{eventXP} XP</h3>
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