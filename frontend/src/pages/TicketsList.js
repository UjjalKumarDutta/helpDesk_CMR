import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { deleteTicket } from "../api/ticket"; // added

function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch tickets (you already had similar code)
  const getTickets = async () => {
    try {
      const res = await API.get("/ticket/my"); // or "/tickets/my" depending on your API (use what worked earlier)
      setTickets(res.data); // adjust if your API returns { tickets: [...] } instead of array
    } catch (error) {
      console.log("Error fetching tickets:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If you previously used an inner fetchTickets function with console.log, you can keep that.
    getTickets();
  }, []);

  // ---------- ADD: delete handler ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await deleteTicket(id); // calls frontend/api/ticket.deleteTicket -> axios.delete
      setTickets((prev) => prev.filter((t) => t._id !== id));
      alert("Ticket deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete ticket. See console for details.");
    }
  };
  // -----------------------------------------

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  if (!tickets || tickets.length === 0)
    return <h3 style={{ textAlign: "center" }}>No Tickets Found</h3>;

  return (
    <div style={styles.container}>
      <h2>All Tickets</h2>

      <div style={styles.list}>
        {(tickets || []).map((t) => (
          <div key={t._id} style={styles.ticket}>
            <h4>{t.title}</h4>
            <p>Status: {t.status}</p>
            <p>Priority: {t.priority}</p>

            <Link to={`/tickets/${t._id}`} style={styles.btn}>
              View Details
            </Link>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(t._id)}
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                padding: "5px 8px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto",
    padding: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  ticket: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  btn: {
    marginTop: "10px",
    display: "inline-block",
    padding: "5px 8px",
    background: "blue",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
  },
};

export default TicketsList;

