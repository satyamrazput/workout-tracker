const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout'); // Import the Workout model

router.post('/', async (req, res) => {
    const { exercises } = req.body;
    const workout = new Workout({ _id: req.body.id, exercises, date: new Date() });

    await workout.save();

    res.status(201).json({ message: 'Workout created successfully', exercises });
});

// Update Workout
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { exercises } = req.body;
    const workout = await Workout.findByIdAndUpdate(id, { exercises }, { new: true });
    if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout updated successfully', exercises });
});

// Delete Workout
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
});

// Schedule Workout
router.post('/schedule', async (req, res) => {
    const { workoutId, dateTime } = req.body;
    // Assuming you have a scheduling mechanism, implement it here
    res.status(201).json({ message: 'Workout scheduled successfully', workoutId, dateTime });
});

// List Workouts
router.get('/', async (req, res) => {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
});

// Generate Reports
router.get('/reports', async (req, res) => {
    // Logic to generate reports on past workouts (implementation needed)
    res.status(200).json({ message: 'Reports generated successfully' });
});

module.exports = router;
