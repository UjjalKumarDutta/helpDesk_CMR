// Backend/controllers/userController.js
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // validate id first to avoid CastError
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("deleteUser error:", error);
    res.status(500).json({ message: error.message });
  }
};
