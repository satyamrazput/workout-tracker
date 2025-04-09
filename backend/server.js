const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Workout Tracker API');
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
if (res.ok) {
    console.log("Login successful, redirecting...");
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
