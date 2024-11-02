// app/signup/page.tsx

"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sending user details to the server
    const userRes = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    const userData = await userRes.json();
    setResponse(userData.status); // Show status message from the response
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "4rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "900px", // Increased width for the form container
        width: "100%",
      }}>
        <h1 style={{ textAlign: "center", color: "#333", fontSize: "24px", fontWeight: "bold", marginBottom: "1.5rem" }}>Signup Page</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#333", fontWeight: "500" }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "110%", padding: "0.8rem", borderRadius: "4px", border: "1px solid #ddd" }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.8rem", color: "#333", fontWeight: "500" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "110%", padding: "0.8rem", marginBottom: "0.8rem", borderRadius: "4px", border: "1px solid #ddd" }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "110%",
              padding: "0.85rem",
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "600",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Submit
          </button>
        </form>
        {response && (
          <div style={{
            marginTop: "1.5rem",
            marginLeft: "0.5rem",
            marginRight: "0.1rem",
            padding: "1rem",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            textAlign: "center",
            fontWeight: "500",
          }}>
            <span role="img" aria-label="check">✅</span> {response}
          </div>
        )}
      </div>
    </div>
  );
}
