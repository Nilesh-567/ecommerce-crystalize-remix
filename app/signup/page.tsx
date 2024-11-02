// app/signup/page.tsx

"use client";

import { useState } from "react";
import styles from "./Signup.module.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [dbStatus, setDbStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check connection to MongoDB
    const res = await fetch("/api/connect");
    const data = await res.json();
    setDbStatus(data.status);

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
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
      {response && (
        <div className={styles.responseContainer}>
          <h2>Server Response:</h2>
          <p>{response}</p>
        </div>
      )}
      {dbStatus && (
        <div className={styles.responseContainer}>
          <h2>Database Status:</h2>
          <p>{dbStatus}</p>
        </div>
      )}
    </div>
  );
}
