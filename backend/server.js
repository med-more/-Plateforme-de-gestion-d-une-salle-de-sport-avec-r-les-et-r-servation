const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const sessionRoutes = require("./routes/sessionRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoute = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/sessions", sessionRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", userRoute);


app.get("/", (req, res) => {
  res.send("🚀 API Gym Management Running...");
});

// Port & Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
