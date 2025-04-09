const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT

// Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate token
        res.status(200).json({ token }); // Return the generated token
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;