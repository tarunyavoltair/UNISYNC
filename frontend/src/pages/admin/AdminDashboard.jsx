import React, { useEffect, useState } from "react";
import { get } from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await get("/admin/stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin statistics:", err);
        setError("Failed to load admin statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p>Loading admin dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-dashboard">
      <h1>College Admin Dashboard</h1>
      <p>Manage and monitor the UNISYNC campus system.</p>

      <div className="admin-summary">
        <div>
          <h3>Total Students</h3>
          <p>{stats.students}</p>
        </div>

        <div>
          <h3>Total Faculty</h3>
          <p>{stats.faculty}</p>
        </div>

        <div>
          <h3>Total Clubs</h3>
          <p>{stats.clubs}</p>
        </div>

        <div>
          <h3>Total Events</h3>
          <p>{stats.events}</p>
        </div>

        <div>
          <h3>Total Halls</h3>
          <p>{stats.halls}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;