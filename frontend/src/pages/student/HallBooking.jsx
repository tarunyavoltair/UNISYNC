import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get, post } from "../../services/api";

function HallBooking() {
  const [selectedHall, setSelectedHall] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [halls, setHalls] = useState([]);
  const [student, setStudent] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [hallData, studentData] = await Promise.all([
          get("/halls"),
          get("/students"),
        ]);

        setHalls(hallData);

        const currentStudent = studentData.find(
          (item) => item.studentId === "STU001"
        );

        setStudent(currentStudent);
      } catch (error) {
        console.error("Failed to load hall booking data:", error);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!student) {
      alert("Student information could not be loaded.");
      return;
    }

    try {
      await post("/bookings", {
        hall: selectedHall._id,
        bookedBy: student._id,
        eventName: bookingForm.purpose,
        date: bookingForm.date,
        startTime: bookingForm.startTime,
        endTime: bookingForm.endTime,
        purpose: bookingForm.purpose,
        status: "pending",
      });

      setBookingSuccess(true);
      setSelectedHall(null);

      setBookingForm({
        date: "",
        startTime: "",
        endTime: "",
        purpose: "",
      });
    } catch (error) {
      console.error("Failed to submit booking:", error);
      alert("Failed to submit booking request. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>🏢 Hall Booking</h1>

          <p>
            Check hall availability and request a hall for college activities,
            meetings and events.
          </p>

          {bookingSuccess && (
            <div className="success-message">
              ✅ Hall booking request submitted successfully!
            </div>
          )}

          <section className="hall-section">
            <h2>Available Halls</h2>

            <div className="hall-grid">
              {halls.length > 0 ? (
                halls.map((hall) => (
                  <div className="hall-card" key={hall._id}>
                    <div className="hall-icon">🏢</div>

                    <h3>{hall.hallName}</h3>

                    <p>
                      <strong>👥 Capacity:</strong> {hall.capacity}
                    </p>

                    <p>
                      <strong>📍 Location:</strong> {hall.location}
                    </p>

                    <p>
                      <strong>🛠️ Facilities:</strong>{" "}
                      {hall.facilities && hall.facilities.length > 0
                        ? hall.facilities.join(", ")
                        : "Not specified"}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          hall.availability === "available"
                            ? "hall-available"
                            : "hall-booked"
                        }
                      >
                        {hall.availability}
                      </span>
                    </p>

                    <button
                      disabled={hall.availability !== "available"}
                      onClick={() => {
                        setSelectedHall(hall);
                        setBookingSuccess(false);
                      }}
                    >
                      {hall.availability === "available"
                        ? "Book Hall"
                        : "Currently Unavailable"}
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading halls...</p>
              )}
            </div>
          </section>

          {selectedHall && (
            <section className="booking-form-section">
              <h2>📋 Request Hall Booking</h2>

              <p>
                Selected Hall: <strong>{selectedHall.hallName}</strong>
              </p>

              <form onSubmit={handleBooking}>
                <label>Booking Date</label>

                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  required
                />

                <label>Start Time</label>

                <input
                  type="time"
                  name="startTime"
                  value={bookingForm.startTime}
                  onChange={handleInputChange}
                  required
                />

                <label>End Time</label>

                <input
                  type="time"
                  name="endTime"
                  value={bookingForm.endTime}
                  onChange={handleInputChange}
                  required
                />

                <label>Purpose of Booking</label>

                <textarea
                  name="purpose"
                  placeholder="Enter the purpose of the hall booking..."
                  value={bookingForm.purpose}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />

                <div className="form-buttons">
                  <button type="submit" className="submit-button">
                    Submit Booking Request
                  </button>

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setSelectedHall(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          <section className="booking-info">
            <h2>ℹ️ Booking Information</h2>

            <ul>
              <li>Check the hall availability before submitting a request.</li>
              <li>Provide the correct date and time for your event.</li>
              <li>Enter a clear purpose for the booking.</li>
              <li>
                Final approval will be handled by the authorized campus
                administrator.
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HallBooking;