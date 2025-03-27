const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
});

const bcrypt = require('bcrypt');

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ token: 'dummy-token' }); // Replace with actual token generation
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


module.exports = router;
