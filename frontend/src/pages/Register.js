// frontend/src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


function Register() {
  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // field-specific validation error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

  // validateForm returns true if valid; sets error messages otherwise
  const validateForm = () => {
    let valid = true;

    // Name: non-empty
    if (!name || name.trim().length < 2) {
      setNameError("Enter your name (at least 2 characters)");
      valid = false;
    } else {
      setNameError("");
    }

    // Email: strict-ish check using regex (ensures domain)
    if (!email || !emailPattern.test(email)) {
      setEmailError("Enter a valid email (e.g. user@domain.com)");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password: length + uppercase + special char
    if (!password || !passwordPattern.test(password)) {
      setPasswordError(
        "Password must be at least 6 chars, include 1 uppercase and 1 special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  // Submit handler: validates first, then calls backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // run frontend validation
    if (!validateForm()) return; // stops submission if invalid

    try {
     const res = await api.post("/auth/register", { name, email, password });

      // success - show message and redirect to login (or do as you prefer)
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      // show backend error message if available
      setApiError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>

      {apiError && <p style={styles.apiError}>{apiError}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError(""); // clear error on change
          }}
          style={styles.input}
          required
        />
        {nameError && <p style={styles.error}>{nameError}</p>}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          style={styles.input}
          required
        />
        {emailError && <p style={styles.error}>{emailError}</p>}

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          style={styles.input}
          required
        />
        {passwordError && <p style={styles.error}>{passwordError}</p>}

        <button type="submit" style={styles.btn}>
          Register
        </button>
      </form>
    </div>
  );
}

/* simple inline styles — adapt to your existing styles */
const styles = {
  container: { width: 360, margin: "60px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: "10px", fontSize: "16px" },
  btn: { padding: "10px", background: "green", color: "white", border: "none" },
  error: { color: "red", margin: 0, fontSize: "14px" },
  apiError: { color: "red", fontWeight: "600" },
};

export default Register;

