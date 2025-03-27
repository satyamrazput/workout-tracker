const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');

const app = express();
app.use(express.static('frontend')); // Serve static files from the frontend directory


// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Workout Tracker API');
});

const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/workout-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
