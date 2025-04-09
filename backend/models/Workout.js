const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    exercises: [
        {
            name: { type: String, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
            weight: { type: Number, required: false },
        },
    ],
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Workout', workoutSchema);
