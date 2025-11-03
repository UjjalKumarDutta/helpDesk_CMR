// backend/routes/user.js
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { deleteUser } = require("../controllers/userController");


router.get("/profile", auth, (req, res) => {
  // req.user is filled by middleware
  res.json({ message: "Profile accessed", user: req.user });
});

// DELETE USER (Admin Only)
router.delete("/:id", auth, adminMiddleware, deleteUser);
module.exports = router;
