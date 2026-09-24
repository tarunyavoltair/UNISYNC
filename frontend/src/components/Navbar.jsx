import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>UNISYNC</h2>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search UNISYNC..."
          className="search-bar"
        />
      </div>

      <div className="navbar-right">
        <button className="notification-btn">🔔</button>

        <div className="profile">
          <span className="profile-icon">👤</span>
          <span>Student</span>
        </div>

        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;