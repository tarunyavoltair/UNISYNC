import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function HallBooking() {
  const [selectedHall, setSelectedHall] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  const halls = [
    {
      name: "Main Auditorium",
      capacity: 500,
      location: "Main Academic Block",
      facilities: "Projector, Sound System, Stage",
      status: "Available",
    },
    {
      name: "Seminar Hall",
      capacity: 150,
      location: "Technology Block - 1st Floor",
      facilities: "Projector, AC, Audio System",
      status: "Available",
    },
    {
      name: "Conference Hall",
      capacity: 80,
      location: "Administrative Block",
      facilities: "Projector, Video Conferencing",
      status: "Available",
    },
    {
      name: "Mini Auditorium",
      capacity: 200,
      location: "Student Activity Block",
      facilities: "Stage, Sound System, Projector",
      status: "Booked",
    },
    {
      name: "Innovation Lab",
      capacity: 60,
      location: "Technology Block - 2nd Floor",
      facilities: "Computers, Projector, Whiteboard",
      status: "Available",
    },
    {
      name: "Open Air Theatre",
      capacity: 300,
      location: "College Ground",
      facilities: "Stage, Lighting, Sound System",
      status: "Available",
    },
  ];

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();

    setBookingSuccess(true);
    setSelectedHall(null);

    setBookingForm({
      date: "",
      startTime: "",
      endTime: "",
      purpose: "",
    });
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
              {halls.map((hall, index) => (
                <div className="hall-card" key={index}>
                  <div className="hall-icon">🏢</div>

                  <h3>{hall.name}</h3>

                  <p>
                    <strong>👥 Capacity:</strong> {hall.capacity}
                  </p>

                  <p>
                    <strong>📍 Location:</strong> {hall.location}
                  </p>

                  <p>
                    <strong>🛠️ Facilities:</strong> {hall.facilities}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        hall.status === "Available"
                          ? "hall-available"
                          : "hall-booked"
                      }
                    >
                      {hall.status}
                    </span>
                  </p>

                  <button
                    disabled={hall.status === "Booked"}
                    onClick={() => {
                      setSelectedHall(hall);
                      setBookingSuccess(false);
                    }}
                  >
                    {hall.status === "Available"
                      ? "Book Hall"
                      : "Currently Booked"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {selectedHall && (
            <section className="booking-form-section">
              <h2>📋 Request Hall Booking</h2>

              <p>
                Selected Hall: <strong>{selectedHall.name}</strong>
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