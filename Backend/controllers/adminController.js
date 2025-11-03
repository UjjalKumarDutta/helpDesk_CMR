const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

exports.adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: "open" });
    const closedTickets = await Ticket.countDocuments({ status: "closed" });

    res.json({
      totalUsers,
      totalTickets,
      openTickets,
      closedTickets,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};

// 1. Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  2. Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("createdBy", "name email role");
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  3. Update ANY ticket (Admin only)
exports.updateAnyTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { status, priority } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;

    await ticket.save();

    res.status(200).json({ message: "Ticket updated by admin", ticket });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete ANY ticket (Admin only)
exports.deleteAnyTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    await ticket.deleteOne();

    res.status(200).json({ message: "Ticket deleted by admin" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  5. Make user an admin
exports.makeAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User role updated to admin", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
