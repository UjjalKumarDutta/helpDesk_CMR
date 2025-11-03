import api from "./axios";

//  Fetch logged-in user's tickets
export const getTickets = async () => {
  return await api.get("/tickets/my");
};

//  Create ticket
export const createTicket = async (data) => {
  return await api.post("/tickets", data);
};

//  Get ticket by ID
export const getTicketById = async (id) => {
  return await api.get(`/tickets/${id}`);
};

//  Update ticket
export const updateTicket = async (id, data) => {
  return await api.put(`/tickets/${id}`, data);
};

// Delete ticket
export const deleteTicket = async (id) => {
  return await api.delete(`/ticket/${id}`);
};
