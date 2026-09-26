import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <nav>
        <Link to="/student">🏠 Dashboard</Link>

        <Link to="/student/map">🗺 Campus Map</Link>

        <Link to="/student/lost-found">🔎 Lost & Found</Link>

        <Link to="/student/faculty">👩🏫 Faculty Locator</Link>

        <Link to="/student/clubs">🏛 Clubs</Link>

        <Link to="/student/events">📅 Events</Link>

        <Link to="/student/hall-booking">🏢 Hall Booking</Link>

        <Link to="/student/digital-id">🪪 Digital ID</Link>

        <Link to="/student/achievements">🏆 XP & Achievements</Link>

        <Link to="/student/ai">🤖 UNISYNC AI</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;