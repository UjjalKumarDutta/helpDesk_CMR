import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function TicketsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    try {
     const res = await API.get(`/ticket/${id}`);
    setTicket(res.data);

    } catch (error) {
      console.log("Error loading ticket:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/ticket/${id}`, {
  title: ticket.title,
  description: ticket.description,
  status: ticket.status,
  priority: ticket.priority,
});


      alert("Ticket updated successfully");
      navigate(`/tickets/${id}`);
    } catch (error) {
      alert(" Failed to update: " + error.message);
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  if (!ticket) return <h3 style={{ textAlign: "center" }}>Ticket Not Found</h3>;

  return (
    <div style={styles.container}>
      <h2>Edit Ticket</h2>

      <form style={styles.form} onSubmit={handleUpdate}>
        <input
          type="text"
          value={ticket.title}
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          placeholder="Title"
          style={styles.input}
          required
        />

        <textarea
          value={ticket.description}
          onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
          placeholder="Description"
          style={styles.textarea}
          required
        />

        <select
          value={ticket.priority}
          onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
          style={styles.input}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={ticket.status}
          onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
          style={styles.input}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <button style={styles.btn}>Update Ticket</button>
      </form>
    </div>
  );
}

const styles = {
  container: { width: "600px", margin: "40px auto" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px" },
  textarea: { padding: "10px", height: "120px", fontSize: "16px" },
  btn: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  }
};

export default TicketsEdit;
