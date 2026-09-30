import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      const response = await post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setMessage("Login successful!");

      if (response.user.role === "admin") {
        navigate("/admin");
      } else if (response.user.role === "faculty") {
        navigate("/faculty");
      } else if (response.user.role === "club-admin") {
        navigate("/club-admin");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome to UNISYNC</h1>

        <p>Smart Campus Portal</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">College Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your college email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;