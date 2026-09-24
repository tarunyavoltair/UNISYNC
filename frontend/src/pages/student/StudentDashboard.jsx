import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Welcome to UNISYNC 👋</h1>

          <p>Your smart campus dashboard</p>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>XP Points</h3>
              <p>250 XP</p>
            </div>

            <div className="dashboard-card">
              <h3>Level</h3>
              <p>Level 3</p>
            </div>

            <div className="dashboard-card">
              <h3>Upcoming Events</h3>
              <p>3 Events</p>
            </div>

            <div className="dashboard-card">
              <h3>Achievements</h3>
              <p>5 Badges</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;