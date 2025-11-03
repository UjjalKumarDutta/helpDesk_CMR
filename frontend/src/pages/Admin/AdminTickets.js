import React, { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminTickets() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/admin/tickets");
      setTickets(res.data.tickets);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      alert("Failed to load tickets");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Manage Tickets</h2>

      {tickets.map((t) => (
        <div key={t._id} style={styles.card}>
          <p><b>Title:</b> {t.title}</p>
          <p><b>Description:</b> {t.description}</p>
          <p><b>Status:</b> {t.status}</p>
          <p><b>Created By:</b> {t.createdBy?.name} ({t.createdBy?.email})</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "700px",
    margin: "40px auto",
    textAlign: "center"
  },
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "15px",
    textAlign: "left"
  }
};

export default AdminTickets;
