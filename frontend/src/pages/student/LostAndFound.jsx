import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function LostAndFound() {
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h1>🔎 Lost & Found</h1>

          <p>
            Report lost items and find items reported by other students.
          </p>

          <button
             className="report-button"
            onClick={() => setShowForm(true)}
>
            + Report Lost Item
         </button>
         {showForm && (
  <div className="report-form">
    <h2>Report Lost Item</h2>

    <input
      type="text"
      placeholder="Item name"
    />

    <input
      type="text"
      placeholder="Location where it was lost"
    />

    <textarea
      placeholder="Describe the item"
      rows="4"
    ></textarea>

    <div className="form-buttons">
      <button
          className="submit-button"
         onClick={() => {
         setSubmitted(true);
         setShowForm(false);
  }}
>
  Submit Report
</button>

      <button
        className="cancel-button"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
{submitted && (
  <div className="success-message">
    ✅ Lost item reported successfully!
  </div>
)}
          <section className="lost-found-section">
            <h2>Recent Lost & Found Items</h2>

            <div className="lost-found-grid">

              <div className="lost-found-card">
                <h3>📱 Mobile Phone</h3>
                <p><strong>Status:</strong> Found</p>
                <p>📍 Found near the Library</p>
                <button>View Details</button>
              </div>

              <div className="lost-found-card">
                <h3>🎒 Black Backpack</h3>
                <p><strong>Status:</strong> Lost</p>
                <p>📍 Lost near the Cafeteria</p>
                <button>View Details</button>
              </div>

              <div className="lost-found-card">
                <h3>🪪 Student ID Card</h3>
                <p><strong>Status:</strong> Found</p>
                <p>📍 Found near the Computer Lab</p>
                <button>View Details</button>
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LostAndFound;