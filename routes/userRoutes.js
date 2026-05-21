const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. USER REGISTRATION (POST)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'Username or email already registered' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. USER LOGIN (POST) - Updated with 10 minutes expiration
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // CAMBIO: Ahora el token caduca estrictamente en 10 minutos
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '10m' } 
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
