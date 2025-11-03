import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function TicketCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 const [priority, setPriority] = useState("low");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/ticket/create", { title, description, priority });
      setSuccess("Ticket created successfully!");
      setTitle("");
      setDescription("");
      setPriority("Low");

      setTimeout(() => navigate("/tickets"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create New Ticket</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        ></textarea>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.input}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>

        </select>

        <button type="submit" style={styles.btn}>
          Submit Ticket
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "60px auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "15px",
  },
  textarea: {
    padding: "10px",
    height: "100px",
    fontSize: "15px",
  },
  btn: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default TicketCreate;
