// frontend/src/pages/Login.js
import { useState } from "react";
import api from "../api/axios";        // keep your existing axios import
import useAuth from "../auth/useAuth";   // keep your existing auth hook
import { useNavigate } from "react-router-dom";

function Login() {
  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validation / API errors (separate states)
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // Frontend validation function
  const validateForm = () => {
    let valid = true;

    // Email basic check
    // Email full validation (must contain @ and .domain)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    setEmailError("Enter a valid email (example: user@gmail.com)");
    valid = false;
} else {
    setEmailError("");
}


    // Password basic check (min length)
   // Password validation: 1 uppercase, 1 special char, min 6 chars
const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

if (!passwordPattern.test(password)) {
    setPasswordError("Password must contain 1 uppercase letter, 1 special character, and be 6+ characters");
    valid = false;
} else {
    setPasswordError("");
}


    return valid;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // Run frontend validation first
    if (!validateForm()) return;

    try {
      // call your backend login endpoint
      const res = await api.post("/auth/login", { email, password });


      // Save user & token in auth context
      // Save token
      localStorage.setItem("token", res.data.token);

// Save user to context
      login(res.data.user);

// Redirect
     navigate("/dashboard");


      // redirect to dashboard (or home)
      navigate("/");
    } catch (err) {
      // show backend message (if any)
      setApiError(err.response?.data?.message || "Login failed");
    }
  };

  // Styles (inline object as you already use)
  const styles = {
    container: {
      width: "350px",
      margin: "80px auto",
      textAlign: "center",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "20px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
    },
    btn: {
      padding: "10px",
      background: "blue",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "5px",
    },
    error: {
      color: "red",
      margin: 0,
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      {/* Show API-level error (general) */}
      {apiError && <p style={styles.error}>{apiError}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        {emailError && <p style={styles.error}>{emailError}</p>}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {passwordError && <p style={styles.error}>{passwordError}</p>}

        <button type="submit" style={styles.btn}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;



