import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function FacultyLocator() {
  const [search, setSearch] = useState("");

  const faculty = [
    {
      name: "Dr. Priya Kumar",
      department: "Computer Science",
      room: "CSE - 204",
      status: "Available",
    },
    {
      name: "Dr. Arun Raj",
      department: "Information Technology",
      room: "IT - 301",
      status: "In Class",
    },
    {
      name: "Ms. Kavya Sharma",
      department: "Computer Science",
      room: "CSE - 105",
      status: "Available",
    },
    {
      name: "Dr. Ramesh Kumar",
      department: "Electronics",
      room: "ECE - 202",
      status: "Busy",
    },
    {
      name: "Ms. Anitha Devi",
      department: "Mathematics",
      room: "MATH - 101",
      status: "Available",
    },
    {
      name: "Dr. Vijay Kumar",
      department: "Mechanical Engineering",
      room: "MECH - 305",
      status: "In Class",
    },
  ];

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
                filteredFaculty.map((member, index) => (
                  <div className="faculty-card" key={index}>
                    <div className="faculty-icon">👩‍🏫</div>

                    <div className="faculty-info">
                      <h3>{member.name}</h3>

                      <p>
                        <strong>Department:</strong>{" "}
                        {member.department}
                      </p>

                      <p>
                        <strong>Room:</strong> {member.room}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={
                            member.status === "Available"
                              ? "status-available"
                              : "status-busy"
                          }
                        >
                          {member.status}
                        </span>
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