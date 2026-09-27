import React, { useEffect, useState } from "react";
import { get } from "../../services/api";

function FacultyDashboard() {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const data = await get("/faculty");
        setFaculty(data);
      } catch (err) {
        console.error("Failed to load faculty:", err);
        setError("Failed to load faculty data.");
      } finally {
        setLoading(false);
      }
    };

    loadFaculty();
  }, []);

  const departments = [
    "All",
    ...new Set(faculty.map((member) => member.department)),
  ];

  const filteredFaculty = faculty.filter((member) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      member.name.toLowerCase().includes(searchText) ||
      member.facultyId.toLowerCase().includes(searchText) ||
      member.designation.toLowerCase().includes(searchText) ||
      member.subjects?.some((subject) =>
        subject.toLowerCase().includes(searchText)
      );

    const matchesDepartment =
      department === "All" || member.department === department;

    return matchesSearch && matchesDepartment;
  });

  if (loading) {
    return <p>Loading faculty data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="faculty-dashboard">
      <h1>Faculty Dashboard</h1>
      <p>Welcome to the UNISYNC Faculty Portal!</p>

      <div className="faculty-filters">
        <input
          type="text"
          placeholder="Search faculty, ID, designation or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="faculty-list">
        {filteredFaculty.length === 0 ? (
          <p>No faculty members found.</p>
        ) : (
          filteredFaculty.map((member) => (
            <div className="faculty-card" key={member.facultyId}>
              <h2>{member.name}</h2>

              <p>
                <strong>Faculty ID:</strong> {member.facultyId}
              </p>

              <p>
                <strong>Department:</strong> {member.department}
              </p>

              <p>
                <strong>Designation:</strong> {member.designation}
              </p>

              <p>
                <strong>Email:</strong> {member.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {member.phone || "Not available"}
              </p>

              <p>
                <strong>Room:</strong>{" "}
                {member.roomNumber || "Not available"}
              </p>

              <p>
                <strong>Building:</strong>{" "}
                {member.building || "Not available"}
              </p>

              <p>
                <strong>Subjects:</strong>{" "}
                {member.subjects?.length
                  ? member.subjects.join(", ")
                  : "Not available"}
              </p>

              <p>
                <strong>Availability:</strong>{" "}
                {member.availability}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FacultyDashboard;