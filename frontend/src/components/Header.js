import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header style={styles.header}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>HelpDesk</Link>

      {/* Navigation */}
     <nav style={styles.nav}>
  {user && (
    <>
      <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/tickets" style={styles.link}>Tickets</Link>
      <Link to="/tickets/create" style={styles.link}>Create Ticket</Link>

      {user?.role === "admin" && (
        <>
          <Link to="/admin/dashboard" style={styles.link}>Admin Dashboard</Link>
          <Link to="/admin/users" style={styles.link}>Manage Users</Link>
          <Link to="/admin/tickets" style={styles.link}>Manage Tickets</Link>
        </>
      )}
    </>
  )}
</nav>


      {/* Right Section */}
      <div style={styles.right}>
        
        {/* Theme Toggle */}
        <button onClick={toggleTheme} style={styles.themeBtn}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {!user && (
          <>
            <Link to="/login" style={styles.btnLogin}>Login</Link>
            <Link to="/register" style={styles.btnRegister}>Register</Link>
          </>
        )}

        {user && (
          <>
            <img 
              src="https://i.pravatar.cc/40" 
              alt="profile" 
              style={styles.avatar}
            />

            <button onClick={logout} style={styles.btnLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "var(--header-bg)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "28px",
    fontWeight: "600",
    color: "var(--text-primary)",
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: "25px",
  },
  link: {
    color: "var(--text-primary)",
    textDecoration: "none",
    fontSize: "16px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  themeBtn: {
    fontSize: "22px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  btnLogin: {
    padding: "6px 15px",
    background: "transparent",
    border: "1px solid #007bff",
    borderRadius: "6px",
    color: "#007bff",
    textDecoration: "none",
  },
  btnRegister: {
    padding: "6px 15px",
    background: "#28a745",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
  },
  btnLogout: {
    padding: "6px 15px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
  },
};


