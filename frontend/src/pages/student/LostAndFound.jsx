import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { get, post } from "../../services/api";

function LostAndFound() {
  const [items, setItems] = useState([]);
  const [student, setStudent] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    location: "",
    dateLost: "",
  });

  // Load lost & found items and current student
  useEffect(() => {
    const loadData = async () => {
      try {
        const [lostItems, students] = await Promise.all([
          get("/lost-found"),
          get("/students"),
        ]);

        setItems(lostItems);

        const currentStudent = students.find(
          (item) => item.studentId === "STU001"
        );

        setStudent(currentStudent);
      } catch (error) {
        console.error("Failed to load Lost & Found data:", error);
      }
    };

    loadData();
  }, []);

  // Handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit lost item
  const handleSubmit = async () => {
    if (
      !formData.itemName ||
      !formData.description ||
      !formData.category ||
      !formData.location ||
      !formData.dateLost
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!student) {
      alert("Student information could not be loaded.");
      return;
    }

    try {
      const newItem = await post("/lost-found", {
        itemName: formData.itemName,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        dateLost: formData.dateLost,
        reportedBy: student._id,
        status: "lost",
      });

      setItems((previous) => [newItem, ...previous]);

      setFormData({
        itemName: "",
        description: "",
        category: "",
        location: "",
        dateLost: "",
      });

      setSubmitted(true);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to report lost item:", error);
      alert("Failed to report lost item. Please try again.");
    }
  };

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
            onClick={() => {
              setShowForm(true);
              setSubmitted(false);
            }}
          >
            + Report Lost Item
          </button>

          {/* Report Form */}
          {showForm && (
            <div className="report-form">
              <h2>Report Lost Item</h2>

              <input
                type="text"
                name="itemName"
                placeholder="Item name"
                value={formData.itemName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Wallet, Phone, Bag)"
                value={formData.category}
                onChange={handleChange}
              />

              <input
                type="text"
                name="location"
                placeholder="Location where it was lost"
                value={formData.location}
                onChange={handleChange}
              />

              <input
                type="date"
                name="dateLost"
                value={formData.dateLost}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Describe the item"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              ></textarea>

              <div className="form-buttons">
                <button
                  className="submit-button"
                  onClick={handleSubmit}
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

          {/* Success Message */}
          {submitted && (
            <div className="success-message">
              ✅ Lost item reported successfully!
            </div>
          )}

          {/* Lost & Found Items */}
          <section className="lost-found-section">
            <h2>Recent Lost & Found Items</h2>

            <div className="lost-found-grid">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    className="lost-found-card"
                    key={item._id}
                  >
                    <h3>🔎 {item.itemName}</h3>

                    <p>
                      <strong>Status:</strong>{" "}
                      {item.status}
                    </p>

                    <p>
                      📍 {item.location}
                    </p>

                    <p>
                      📝 {item.description}
                    </p>

                    <p>
                      📅{" "}
                      {new Date(item.dateLost).toLocaleDateString()}
                    </p>

                    <button>View Details</button>
                  </div>
                ))
              ) : (
                <p>No Lost & Found items available.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LostAndFound;