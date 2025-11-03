const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const ticketRoutes = require("./routes/ticket");
app.use("/api/ticket", ticketRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);


// Default Route
app.get("/", (req, res) => {
  res.send("Helpdesk CRM Backend is Running");
});

// Listen server on port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
