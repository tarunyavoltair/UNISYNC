import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get } from "../../services/api";

function Clubs() {
  const [search, setSearch] = useState("");
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const data = await get("/clubs");
        setClubs(data);
      } catch (error) {
        console.error("Failed to load clubs:", error);
      }
    };

    loadClubs();
  }, []);

  const filteredClubs = clubs.filter(
    (club) =>
      club.clubName.toLowerCase().includes(search.toLowerCase()) ||
      club.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>🏛️ Clubs & Societies</h1>

          <p>
            Discover student clubs, explore your interests and join campus
            communities.
          </p>

          <div className="club-search">
            <input
              type="text"
              placeholder="Search clubs or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <section className="clubs-section">
            <h2>Available Clubs</h2>

            <div className="clubs-grid">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club) => (
                  <div className="club-card" key={club._id}>
                    <div className="club-icon">🏛️</div>

                    <h3>{club.clubName}</h3>

                    <p className="club-category">
                      {club.category}
                    </p>

                    <p>
                      {club.description || "No description available."}
                    </p>

                    <p>
                      <strong>Members:</strong>{" "}
                      {club.members ? club.members.length : 0}
                    </p>

                    <p>
                      <strong>Faculty Coordinator:</strong>{" "}
                      {club.facultyCoordinator?.name || "Not assigned"}
                    </p>

                    <p>
                      <strong>President:</strong>{" "}
                      {club.president?.name || "Not assigned"}
                    </p>

                    <p>
                      <strong>Meeting:</strong>{" "}
                      {club.meetingLocation || "Not specified"}
                    </p>

                    <p>
                      <strong>Time:</strong>{" "}
                      {club.meetingTime || "Not specified"}
                    </p>

                    <button>Join Club</button>
                  </div>
                ))
              ) : (
                <p>No clubs found.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Clubs;