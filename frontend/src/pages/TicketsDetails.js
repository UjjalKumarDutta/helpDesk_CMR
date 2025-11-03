import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTicket = async () => {
    try {
      const res = await API.get(`/ticket/${id}`);
setTicket(res.data);

    } catch (error) {
      console.log("Error fetching ticket:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  if (!ticket) return <h3 style={{ textAlign: "center" }}>Ticket Not Found</h3>;

  return (
    <div style={styles.container}>
      <h2>{ticket.title}</h2>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Description:</strong> {ticket.description}</p>

      <Link to="/tickets" style={styles.btn}>Back to Tickets</Link>

      <Link to={`/tickets/${id}/edit`} style={styles.btnBlue}>
  Edit Ticket
</Link>

    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px"
  },
  btn: {
    marginTop: "20px",
    display: "inline-block",
    padding: "8px 12px",
    background: "blue",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none"
  }
  
};

export default TicketDetails;
