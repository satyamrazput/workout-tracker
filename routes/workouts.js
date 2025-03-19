const express = require("express");
const Workout = require("../models/Workout");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Workout
router.post("/", authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.create({ userId: req.user.id, ...req.body });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Workouts
router.get("/", authMiddleware, async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });
  res.json(workouts);
});

// Delete Workout
router.delete("/:id", authMiddleware, async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: "Workout deleted" });
});

module.exports = router;
