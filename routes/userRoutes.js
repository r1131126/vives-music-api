const express = require('express');
const router = express.Router();
const User = require('../models/User');

// USER REGISTRATION (POST)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' }); // Traducido
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'Username or email already registered' }); // Traducido
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' }); // Traducido

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
