const express = require('express');
const router = express.Router();
const Artist = require('../models/Music');

// 1. OBTENER TODOS LOS ARTISTAS (GET)
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. CREAR UN NUEVO ARTISTA CON SU ALBUM Y CANCIONES (POST)
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name,
        country: req.body.country,
        albums: req.body.albums || []
    });

    try {
        const newArtist = await artist.save();
        res.status(201).json(newArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

