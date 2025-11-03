const express = require("express");
const router = express.Router();

const {
  adminDashboard,
  getAllUsers,
  getAllTickets,
  updateAnyTicket,
  deleteAnyTicket,
  makeAdmin,
} = require("../controllers/adminController");


const auth = require("../middleware/authMiddleware");

//  Only admin can access these routes
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

//  ROUTES
router.get("/dashboard", auth, adminOnly, adminDashboard);

router.get("/users", auth, adminOnly, getAllUsers);
router.get("/tickets", auth, adminOnly, getAllTickets);
router.put("/ticket/:id", auth, adminOnly, updateAnyTicket);
router.delete("/ticket/:id", auth, adminOnly, deleteAnyTicket);
router.put("/user/:id/make-admin", auth, adminOnly, makeAdmin);

module.exports = router;
