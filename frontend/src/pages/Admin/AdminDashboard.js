import React, { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard error:", err);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Tickets</h3>
          <p>{stats.totalTickets}</p>
        </div>

        <div style={styles.card}>
          <h3>Open Tickets</h3>
          <p>{stats.openTickets}</p>
        </div>

        <div style={styles.card}>
          <h3>Closed Tickets</h3>
          <p>{stats.closedTickets}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto",
    textAlign: "center",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "18px",
    background: "#f5f5f5",
  },
};

export default AdminDashboard;
