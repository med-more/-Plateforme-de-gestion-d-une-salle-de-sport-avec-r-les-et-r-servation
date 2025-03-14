const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Import dashboardRoutes

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/dashboard', dashboardRoutes); // Mount dashboardRoutes
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 API Gym Management Running...');
});

// Port & Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});