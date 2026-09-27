import React, { useEffect, useState } from "react";
import { get } from "../../services/api";

function FacultyDashboard() {
  const [faculty, setFaculty] = useState([]);
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

      <div className="faculty-list">
        {faculty.map((member) => (
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
              <strong>Phone:</strong> {member.phone || "Not available"}
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
              <strong>Availability:</strong> {member.availability}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyDashboard;