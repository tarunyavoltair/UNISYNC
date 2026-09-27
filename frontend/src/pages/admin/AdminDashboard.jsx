import React, { useEffect, useState } from "react";
import { get } from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await get("/admin/stats");
        const studentData = await get("/students");
        const facultyData = await get("/faculty");
        const clubData = await get("/clubs");
        const eventData = await get("/events");

        setStats(data);
        setStudents(studentData);
        setFaculty(facultyData);
        setClubs(clubData);
        setEvents(eventData);
      } catch (err) {
        console.error("Failed to load admin data:", err);
        setError("Failed to load admin data.");
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

      {/* ==================== */}
      {/* DASHBOARD STATISTICS */}
      {/* ==================== */}

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

      {/* ==================== */}
      {/* STUDENTS */}
      {/* ==================== */}

      <div className="admin-students">
        <h2>Students</h2>

        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
            <div
              className="admin-student-card"
              key={student.studentId}
            >
              <h3>{student.name}</h3>

              <p>
                <strong>Student ID:</strong>{" "}
                {student.studentId}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {student.email}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {student.department}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {student.year}
              </p>

              <p>
                <strong>XP:</strong>{" "}
                {student.xp}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {student.role}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ==================== */}
      {/* FACULTY */}
      {/* ==================== */}

      <div className="admin-faculty">
        <h2>Faculty</h2>

        {faculty.length === 0 ? (
          <p>No faculty found.</p>
        ) : (
          faculty.map((member) => (
            <div
              className="admin-faculty-card"
              key={member.facultyId}
            >
              <h3>{member.name}</h3>

              <p>
                <strong>Faculty ID:</strong>{" "}
                {member.facultyId}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {member.department}
              </p>

              <p>
                <strong>Designation:</strong>{" "}
                {member.designation}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {member.email}
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
                <strong>Availability:</strong>{" "}
                {member.availability}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ==================== */}
      {/* CLUBS */}
      {/* ==================== */}

      <div className="admin-clubs">
        <h2>Clubs</h2>

        {clubs.length === 0 ? (
          <p>No clubs found.</p>
        ) : (
          clubs.map((club) => (
            <div
              className="admin-club-card"
              key={club._id}
            >
              <h3>{club.clubName}</h3>

              <p>
                <strong>Category:</strong>{" "}
                {club.category}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {club.description || "Not available"}
              </p>

              <p>
                <strong>Faculty Coordinator:</strong>{" "}
                {club.facultyCoordinator?.name ||
                  "Not assigned"}
              </p>

              <p>
                <strong>President:</strong>{" "}
                {club.president?.name ||
                  "Not assigned"}
              </p>

              <p>
                <strong>Members:</strong>{" "}
                {club.members?.length || 0}
              </p>

              <p>
                <strong>Meeting Location:</strong>{" "}
                {club.meetingLocation ||
                  "Not specified"}
              </p>

              <p>
                <strong>Meeting Time:</strong>{" "}
                {club.meetingTime ||
                  "Not specified"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {club.isActive
                  ? "Active"
                  : "Inactive"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ==================== */}
      {/* EVENTS */}
      {/* ==================== */}

      <div className="admin-events">
        <h2>Events</h2>

        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div
              className="admin-event-card"
              key={event._id}
            >
              <h3>
                {event.title ||
                  event.eventName ||
                  "Untitled Event"}
              </h3>

              <p>
                <strong>Description:</strong>{" "}
                {event.description ||
                  "Not available"}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {event.category ||
                  "Not specified"}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {event.date
                  ? new Date(
                      event.date
                    ).toLocaleDateString()
                  : "Not specified"}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {event.time ||
                  "Not specified"}
              </p>

              <p>
                <strong>Venue:</strong>{" "}
                {event.venue ||
                  event.location ||
                  "Not specified"}
              </p>

              <p>
                <strong>Organizer:</strong>{" "}
                {event.organizer?.name ||
                  "Not assigned"}
              </p>

              <p>
                <strong>Organizer Email:</strong>{" "}
                {event.organizer?.email ||
                  "Not available"}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {event.organizer?.department ||
                  "Not available"}
              </p>

              <p>
                <strong>Club:</strong>{" "}
                {event.club?.clubName ||
                  "Not associated"}
              </p>

              <p>
                <strong>Club Category:</strong>{" "}
                {event.club?.category ||
                  "Not available"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;