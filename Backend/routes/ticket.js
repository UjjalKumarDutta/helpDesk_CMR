const express = require("express");
const router = express.Router();

const { createTicket, getMyTickets,getTicketById, updateTicket, deleteTicket} = require("../controllers/ticketController");
const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createTicket);
router.get("/my", auth, getMyTickets);
router.get("/:id", auth, getTicketById);
router.put("/:id", auth, updateTicket);
router.delete("/:id", auth, deleteTicket);

module.exports = router;
