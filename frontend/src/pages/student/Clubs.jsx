import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Clubs() {
  const [search, setSearch] = useState("");

  const clubs = [
    {
      name: "Coding Club",
      category: "Technology",
      description:
        "Learn programming, participate in coding competitions and build projects.",
      members: 85,
    },
    {
      name: "Robotics Club",
      category: "Technology",
      description:
        "Explore robotics, automation and hardware-based projects.",
      members: 60,
    },
    {
      name: "Photography Club",
      category: "Arts",
      description:
        "Capture campus life, learn photography and participate in photo events.",
      members: 45,
    },
    {
      name: "Music Club",
      category: "Cultural",
      description:
        "Join fellow students interested in singing, instruments and performances.",
      members: 70,
    },
    {
      name: "Dance Club",
      category: "Cultural",
      description:
        "Learn different dance styles and perform at college events.",
      members: 55,
    },
    {
      name: "Sports Club",
      category: "Sports",
      description:
        "Participate in sports activities, tournaments and fitness events.",
      members: 100,
    },
  ];

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(search.toLowerCase()) ||
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
                filteredClubs.map((club, index) => (
                  <div className="club-card" key={index}>
                    <div className="club-icon">🏛️</div>

                    <h3>{club.name}</h3>

                    <p className="club-category">
                      {club.category}
                    </p>

                    <p>{club.description}</p>

                    <p>
                      <strong>Members:</strong> {club.members}
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