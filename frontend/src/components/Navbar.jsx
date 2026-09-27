import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Return to login page
    navigate("/");
  };

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

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
          <span>{user ? user.name : "Student"}</span>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;