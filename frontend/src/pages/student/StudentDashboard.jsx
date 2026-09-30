import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Welcome back, Student 👋</h1>
          <p>Here is what's happening around your campus.</p>

          {/* Stats */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>⭐ XP Points</h3>
              <p>250 XP</p>
            </div>

            <div className="dashboard-card">
              <h3>🏆 Level</h3>
              <p>Level 3</p>
            </div>

            <div className="dashboard-card">
              <h3>🎯 Achievements</h3>
              <p>5 Badges</p>
            </div>

            <div className="dashboard-card">
              <h3>📅 Events</h3>
              <p>3 Upcoming</p>
            </div>
          </div>

          {/* Main Sections */}
          <div className="dashboard-sections">

            {/* What's Happening */}
            <section className="dashboard-section">
              <h2>📢 What's Happening Now?</h2>

              <div className="event-item">
                <h3>Tech Club Workshop</h3>
                <p>Today • 2:00 PM • Computer Lab</p>
              </div>

              <div className="event-item">
                <h3>Sports Meet</h3>
                <p>Today • 4:30 PM • College Ground</p>
              </div>

              <div className="event-item">
                <h3>Photography Club Meetup</h3>
                <p>Tomorrow • 11:00 AM • Seminar Hall</p>
              </div>
            </section>

            {/* Recent Achievements */}
            <section className="dashboard-section">
              <h2>🏆 Recent Achievements</h2>

              <div className="achievement-item">
                <span>🥇</span>
                <div>
                  <h3>Event Participant</h3>
                  <p>Earned 50 XP</p>
                </div>
              </div>

              <div className="achievement-item">
                <span>🎯</span>
                <div>
                  <h3>Club Member</h3>
                  <p>Earned 30 XP</p>
                </div>
              </div>

              <div className="achievement-item">
                <span>🚀</span>
                <div>
                  <h3>First Workshop</h3>
                  <p>Earned 20 XP</p>
                </div>
              </div>
            </section>

          </div>

          {/* Quick Actions */}
          <section className="quick-actions">
            <h2>⚡ Quick Actions</h2>

            <div className="quick-action-grid">

              <button
                onClick={() => navigate("/student/lost-found")}
              >
                🔎 Report Lost Item
              </button>

              <button
                onClick={() => navigate("/student/map")}
              >
                🗺️ Open Campus Map
              </button>

              <button
                onClick={() => navigate("/student/faculty")}
              >
                👩‍🏫 Find Faculty
              </button>

              <button
                onClick={() => navigate("/student/clubs")}
              >
                🏛️ Explore Clubs
              </button>

              <button
                onClick={() => navigate("/student/events")}
              >
                📅 View Events
              </button>

              <button
                onClick={() => navigate("/student/hall-booking")}
              >
                🏢 Book a Hall
              </button>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;