require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/workouts", require("./routes/workouts"));

app.get("/", (req, res) => res.send("Workout Tracker API is running..."));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
