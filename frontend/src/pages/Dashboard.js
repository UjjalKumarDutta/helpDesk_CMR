import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h2>Welcome, {user?.name}</h2>

      <div style={styles.box}>
        <Link to="/tickets" style={styles.link}>View All Tickets</Link>
        <Link to="/tickets/create" style={styles.link}>Create New Ticket</Link>
        <Link to="/profile" style={styles.link}>My Profile</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "60px auto",
    textAlign: "center",
  },
  box: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    padding: "12px",
    background: "#2a60e8",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
  },
};

export default Dashboard;
