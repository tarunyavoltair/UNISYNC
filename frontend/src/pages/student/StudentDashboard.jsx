import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get } from "../../services/api";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Get the currently logged-in user
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          console.error("No logged-in user found.");
          setLoading(false);
          return;
        }

        const loggedInUser = JSON.parse(storedUser);

        const [students, eventData, clubData, lostFoundData] =
          await Promise.all([
            get("/students"),
            get("/events"),
            get("/clubs"),
            get("/lost-found"),
          ]);

        // Find the logged-in student's actual record
        const currentStudent = students.find(
          (item) => item.studentId === loggedInUser.studentId
        );

        setStudent(currentStudent);
        setEvents(eventData);
        setClubs(clubData);
        setLostItems(lostFoundData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Only show events that are upcoming or ongoing
  const upcomingEvents = events
    .filter(
      (event) =>
        event.status === "upcoming" ||
        event.status === "ongoing"
    )
    .slice(0, 3);

  const getEventDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>
            Welcome back, {student ? student.name : "Student"} 👋
          </h1>

          <p>
            Here is what's happening around your campus.
          </p>

          {loading ? (
            <p>Loading dashboard...</p>
          ) : (
            <>
              {/* Stats */}

              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <h3>⭐ XP Points</h3>
                  <p>
                    {student
                      ? `${student.xp} XP`
                      : "0 XP"}
                  </p>
                </div>

                <div className="dashboard-card">
                  <h3>🏆 Level</h3>
                  <p>
                    {student
                      ? `Level ${Math.floor(student.xp / 100) + 1}`
                      : "Level 1"}
                  </p>
                </div>

                <div className="dashboard-card">
                  <h3>🎯 Achievements</h3>
                  <p>
                    {student
                      ? `${student.badges.length} Badges`
                      : "0 Badges"}
                  </p>
                </div>

                <div className="dashboard-card">
                  <h3>📅 Events</h3>
                  <p>
                    {upcomingEvents.length} Upcoming
                  </p>
                </div>
              </div>

              {/* Main sections */}

              <div className="dashboard-sections">
                <section className="dashboard-section">
                  <h2>📢 What's Happening Now?</h2>

                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <div
                        className="event-item"
                        key={event._id}
                      >
                        <h3>{event.eventName}</h3>

                        <p>
                          {getEventDate(event.date)} •{" "}
                          {event.startTime} •{" "}
                          {event.location}
                        </p>

                        <p>
                          {event.description ||
                            "Campus event"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>
                      No upcoming events at the moment.
                    </p>
                  )}

                  <Link to="/student/events">
                    View All Events →
                  </Link>
                </section>

                <section className="dashboard-section">
                  <h2>🏆 Recent Achievements</h2>

                  {student && student.badges.length > 0 ? (
                    student.badges.map((badge, index) => (
                      <div
                        className="achievement-item"
                        key={index}
                      >
                        <span>🏅</span>

                        <div>
                          <h3>{badge}</h3>
                          <p>Achievement unlocked</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No achievements unlocked yet.</p>
                  )}

                  <Link to="/student/achievements">
                    View Achievements →
                  </Link>
                </section>
              </div>

              {/* Campus Overview */}

              <section className="dashboard-section campus-overview">
                <h2>🏫 Campus Overview</h2>

                <div className="dashboard-overview-grid">
                  <div>
                    <h3>🏛️ Clubs</h3>
                    <p>{clubs.length} Active Clubs</p>
                  </div>

                  <div>
                    <h3>🔎 Lost & Found</h3>
                    <p>
                      {lostItems.length} Reported Items
                    </p>
                  </div>

                  <div>
                    <h3>📅 Events</h3>
                    <p>{events.length} Total Events</p>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}

              <section className="quick-actions">
                <h2>⚡ Quick Actions</h2>

                <div className="quick-action-grid">
                  <Link to="/student/lost-found">
                    🔎 Report Lost Item
                  </Link>

                  <Link to="/student/map">
                    🗺️ Open Campus Map
                  </Link>

                  <Link to="/student/faculty">
                    👩‍🏫 Find Faculty
                  </Link>

                  <Link to="/student/clubs">
                    🏛️ Explore Clubs
                  </Link>

                  <Link to="/student/events">
                    📅 View Events
                  </Link>

                  <Link to="/student/hall-booking">
                    🏢 Book a Hall
                  </Link>

                  <Link to="/student/digital-id">
                    🪪 Digital ID
                  </Link>

                  <Link to="/student/achievements">
                    🏆 XP & Achievements
                  </Link>

                  <Link to="/student/ai">
                    🤖 Ask UNISYNC AI
                  </Link>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;