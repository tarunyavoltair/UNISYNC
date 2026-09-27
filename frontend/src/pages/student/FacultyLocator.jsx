import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get } from "../../services/api";

function FacultyLocator() {
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const data = await get("/faculty");
        setFaculty(data);
      } catch (error) {
        console.error("Failed to load faculty:", error);
      }
    };

    loadFaculty();
  }, []);

  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>👩‍🏫 Faculty Locator</h1>

          <p>
            Find faculty members, their departments, rooms and current
            availability.
          </p>

          <div className="faculty-search">
            <input
              type="text"
              placeholder="Search faculty or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <section className="faculty-section">
            <h2>Faculty Directory</h2>

            <div className="faculty-grid">
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((member) => (
                  <div
                    className="faculty-card"
                    key={member._id}
                  >
                    <div className="faculty-icon">👩‍🏫</div>

                    <div className="faculty-info">
                      <h3>{member.name}</h3>

                      <p>
                        <strong>Department:</strong>{" "}
                        {member.department}
                      </p>

                      <p>
                        <strong>Designation:</strong>{" "}
                        {member.designation}
                      </p>

                      <p>
                        <strong>Room:</strong>{" "}
                        {member.roomNumber || "Not assigned"}
                      </p>

                      <p>
                        <strong>Building:</strong>{" "}
                        {member.building || "Not assigned"}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={
                            member.availability === "Available"
                              ? "status-available"
                              : "status-busy"
                          }
                        >
                          {member.availability}
                        </span>
                      </p>

                      <p>
                        <strong>Email:</strong>{" "}
                        {member.email}
                      </p>
                    </div>

                    <button>View Location</button>
                  </div>
                ))
              ) : (
                <p>No faculty members found.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FacultyLocator;