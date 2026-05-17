const express = require('express');
const router = express.Router();
const Music = require('../models/Music');

// 1. OBTENER TODAS LAS CANCIONES (GET)
router.get('/', async (req, res) => {
    try {
        const songs = await Music.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. CREAR UNA NUEVA CANCION (POST)
router.post('/', async (req, res) => {
    const song = new Music({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre
    });

    try {
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
