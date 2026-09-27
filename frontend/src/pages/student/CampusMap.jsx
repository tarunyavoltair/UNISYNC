import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get } from "../../services/api";

function CampusMap() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await get("/campus-locations");
        setLocations(data);
      } catch (error) {
        console.error("Failed to load campus locations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  const filteredLocations = locations.filter((location) => {
    const searchText = search.toLowerCase();

    return (
      location.name.toLowerCase().includes(searchText) ||
      location.building.toLowerCase().includes(searchText) ||
      location.category.toLowerCase().includes(searchText)
    );
  });

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

          {/* Search */}
          <div className="map-search">
            <input
              type="text"
              placeholder="Search campus location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button">
              Search
            </button>
          </div>

          {/* Locations */}
          <section className="locations-section">
            <h2>Campus Locations</h2>

            {loading ? (
              <p>Loading campus locations...</p>
            ) : filteredLocations.length > 0 ? (
              <div className="locations-grid">
                {filteredLocations.map((location) => (
                  <div
                    className="location-card"
                    key={location._id}
                  >
                    <h3>
                      {location.icon} {location.name}
                    </h3>

                    <p>
                      {location.description}
                    </p>

                    <p>
                      <strong>📍 Building:</strong>{" "}
                      {location.building}
                    </p>

                    <p>
                      <strong>🏢 Floor:</strong>{" "}
                      {location.floor}
                    </p>

                    <p>
                      <strong>📂 Category:</strong>{" "}
                      {location.category}
                    </p>

                    <button type="button">
                      View Location
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                No campus locations found.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default CampusMap;