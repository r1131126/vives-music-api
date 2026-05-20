const express = require('express');
const router = express.Router();
const User = require('../models/User');

// REGISTRO DE USUARIOS (POST)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario o el email ya estan registrados' });
        }

        // Forzamos a que ignore cualquier intento de enviar un rol administrativo
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
