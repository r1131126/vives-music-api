const express = require('express');
const router = express.Router();
const Artist = require('../models/Music');
const validateObjectId = require('../middlewares/validateId');

// 1. OBTENER TODOS LOS ARTISTAS (GET)
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. OBTENER UN ARTISTA ESPECIFICO POR ID (GET con validacion)
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artista no encontrado' });
        }
        res.json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. CREAR UN NUEVO ARTISTA CON SU ALBUM Y CANCIONES (POST)
router.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: 'El nombre del artista es obligatorio' });
    }

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

