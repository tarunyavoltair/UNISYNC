import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function CampusMap() {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>🗺️ Campus Map</h1>

          <p>
            Find classrooms, labs, facilities and important locations around
            the campus.
          </p>

          <div className="map-search">
            <input
              type="text"
              placeholder="Search campus location..."
            />
            <button>Search</button>
          </div>

          <section className="locations-section">
            <h2>Campus Locations</h2>

            <div className="locations-grid">
              <div className="location-card">
                <h3>📚 Library</h3>
                <p>Main Academic Block</p>
                <button>View Location</button>
              </div>

              <div className="location-card">
                <h3>💻 Computer Lab</h3>
                <p>Technology Block - 2nd Floor</p>
                <button>View Location</button>
              </div>

              <div className="location-card">
                <h3>🍴 Cafeteria</h3>
                <p>Student Activity Block</p>
                <button>View Location</button>
              </div>

              <div className="location-card">
                <h3>🏥 Medical Room</h3>
                <p>Administrative Block - Ground Floor</p>
                <button>View Location</button>
              </div>

              <div className="location-card">
                <h3>🏟️ College Ground</h3>
                <p>Sports Complex</p>
                <button>View Location</button>
              </div>

              <div className="location-card">
                <h3>🚗 Parking</h3>
                <p>North Campus Entrance</p>
                <button>View Location</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CampusMap;