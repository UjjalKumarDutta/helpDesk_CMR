import React, { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);

    } catch (err) {
      console.error("Error loading users:", err);
      alert("Failed to load users");
    }
  };

  const makeAdmin = async (id) => {
    try {
      const res = await api.put(`/admin/user/${id}/make-admin`);
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Manage Users</h2>

      {users.map((u) => (
        <div key={u._id} style={styles.card}>
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Role:</b> {u.role}</p>

          {u.role !== "admin" && (
            <button
              style={styles.btn}
              onClick={() => makeAdmin(u._id)}
            >
              Make Admin
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "600px",
    margin: "40px auto",
    textAlign: "center",
  },
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  btn: {
    padding: "8px 15px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminUsers;
