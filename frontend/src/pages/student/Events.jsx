import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Events() {
  const [search, setSearch] = useState("");

  const events = [
    {
      name: "Tech Fest 2026",
      category: "Technology",
      date: "October 5, 2026",
      time: "10:00 AM",
      location: "Main Auditorium",
      description:
        "A campus technology festival featuring coding contests, workshops and project exhibitions.",
    },
    {
      name: "Cultural Fest",
      category: "Cultural",
      date: "October 12, 2026",
      time: "4:00 PM",
      location: "College Ground",
      description:
        "Enjoy music, dance, performances and cultural activities conducted by student clubs.",
    },
    {
      name: "Coding Competition",
      category: "Competition",
      date: "October 18, 2026",
      time: "9:00 AM",
      location: "Computer Lab",
      description:
        "Test your programming skills and compete with students across the campus.",
    },
    {
      name: "Robotics Workshop",
      category: "Workshop",
      date: "October 22, 2026",
      time: "2:00 PM",
      location: "Technology Block",
      description:
        "Hands-on workshop covering robotics, sensors and automation.",
    },
    {
      name: "Sports Meet",
      category: "Sports",
      date: "November 2, 2026",
      time: "8:00 AM",
      location: "Sports Complex",
      description:
        "Participate in athletics, team sports and other campus competitions.",
    },
    {
      name: "Photography Walk",
      category: "Club Event",
      date: "November 8, 2026",
      time: "3:00 PM",
      location: "Campus Garden",
      description:
        "Explore the campus with fellow photography enthusiasts and capture creative moments.",
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
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
                filteredEvents.map((event, index) => (
                  <div className="event-card" key={index}>
                    <div className="event-icon">📅</div>

                    <h3>{event.name}</h3>

                    <p className="event-category">
                      {event.category}
                    </p>

                    <p>
                      <strong>📆 Date:</strong> {event.date}
                    </p>

                    <p>
                      <strong>⏰ Time:</strong> {event.time}
                    </p>

                    <p>
                      <strong>📍 Location:</strong> {event.location}
                    </p>

                    <p>{event.description}</p>

                    <button>Register</button>
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