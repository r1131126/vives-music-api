const express = require('express');
const router = express.Router();
const Artist = require('../models/Music');
const validateObjectId = require('../middlewares/validateId');
const authorize = require('../middlewares/auth'); // Importamos el escudo de seguridad

// 1. GET ALL ARTISTS (Public: Anyone can view the music)
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. GET SPECIFIC ARTIST BY ID (Public: Anyone can view)
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. CREATE A NEW ARTIST (Protected: Only registered 'user' and 'admin' can add music)
router.post('/', authorize(['user', 'admin']), async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: 'Artist name is required' });
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

// 4. DELETE AN ARTIST (Strictly Protected: ONLY 'admin' can delete)
router.delete('/:id', validateObjectId, authorize('admin'), async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json({ message: 'Artist deleted successfully from the database' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
