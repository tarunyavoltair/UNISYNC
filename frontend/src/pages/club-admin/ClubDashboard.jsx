import React, { useEffect, useState } from "react";
import { get, post } from "../../services/api";

function ClubDashboard() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
  clubName: "",
  description: "",
  category: "",
  meetingLocation: "",
  meetingTime: "",
});

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const data = await get("/clubs");
        setClubs(data);
      } catch (err) {
        console.error("Failed to load clubs:", err);
        setError("Failed to load club data.");
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, []);

  const handleFormChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleCreateClub = async (e) => {
  e.preventDefault();

  try {
    await post("/clubs", {
      ...formData,
      isActive: true,
    });

    setFormData({
      clubName: "",
      description: "",
      category: "",
      meetingLocation: "",
      meetingTime: "",
    });

    setShowForm(false);

    const updatedClubs = await get("/clubs");
    setClubs(updatedClubs);
  } catch (err) {
    console.error("Failed to create club:", err);
    setError("Failed to create club.");
  }
};
  const categories = [
    "All",
    ...new Set(clubs.map((club) => club.category)),
  ];

  const filteredClubs = clubs.filter((club) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      club.clubName.toLowerCase().includes(searchText) ||
      club.category.toLowerCase().includes(searchText) ||
      club.description?.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || club.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p>Loading club data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="club-admin-dashboard">
      <h1>Club Admin Dashboard</h1>
      <p>Manage and monitor UNISYNC clubs.</p>
      <button onClick={() => setShowForm(!showForm)}>
  {showForm ? "Cancel" : "Create New Club"}
</button>

      {showForm && (
  <form onSubmit={handleCreateClub} className="club-form">
    <input
      type="text"
      name="clubName"
      placeholder="Club Name"
      value={formData.clubName}
      onChange={handleFormChange}
      required
    />

    <textarea
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleFormChange}
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      value={formData.category}
      onChange={handleFormChange}
      required
    />

    <input
      type="text"
      name="meetingLocation"
      placeholder="Meeting Location"
      value={formData.meetingLocation}
      onChange={handleFormChange}
    />

    <input
      type="text"
      name="meetingTime"
      placeholder="Meeting Time"
      value={formData.meetingTime}
      onChange={handleFormChange}
    />

    <button type="submit">
      Create Club
    </button>
  </form>
)}
      <div className="club-summary">
        <div>
          <h3>Total Clubs</h3>
          <p>{clubs.length}</p>
        </div>

        <div>
          <h3>Active Clubs</h3>
          <p>
            {clubs.filter((club) => club.isActive).length}
          </p>
        </div>

        <div>
          <h3>Total Members</h3>
          <p>
            {clubs.reduce(
              (total, club) => total + (club.members?.length || 0),
              0
            )}
          </p>
        </div>
      </div>

      <div className="club-filters">
        <input
          type="text"
          placeholder="Search clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="club-list">
        {filteredClubs.length === 0 ? (
          <p>No clubs found.</p>
        ) : (
          filteredClubs.map((club) => (
            <div className="club-card" key={club._id}>
              <h2>{club.clubName}</h2>

              <p>{club.description}</p>

              <p>
                <strong>Category:</strong> {club.category}
              </p>

              <p>
                <strong>Faculty Coordinator:</strong>{" "}
                {club.facultyCoordinator?.name || "Not assigned"}
              </p>

              <p>
                <strong>President:</strong>{" "}
                {club.president?.name || "Not assigned"}
              </p>

              <p>
                <strong>Members:</strong>{" "}
                {club.members?.length || 0}
              </p>

              <p>
                <strong>Meeting Location:</strong>{" "}
                {club.meetingLocation || "Not specified"}
              </p>

              <p>
                <strong>Meeting Time:</strong>{" "}
                {club.meetingTime || "Not specified"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {club.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClubDashboard;