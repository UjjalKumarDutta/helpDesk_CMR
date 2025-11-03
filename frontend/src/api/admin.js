import api from "./axios";

// Get all users
export const getAllUsers = () => api.get("/admin/users");

// Get all tickets
export const getAllTickets = () => api.get("/admin/tickets");

// Make user admin
export const makeAdmin = (id) => api.put(`/admin/make-admin/${id}`);
