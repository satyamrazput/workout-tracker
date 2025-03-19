const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  exercises: [{ name: String, sets: Number, reps: Number, weight: Number }]
});

module.exports = mongoose.model("Workout", WorkoutSchema);
