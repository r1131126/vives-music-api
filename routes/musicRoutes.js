const express = require('express');
const router = express.Router();
const Artist = require('../models/Music');
const validateObjectId = require('../middlewares/validateId');
const authorize = require('../middlewares/auth');

// Wrapper to automatically forward errors to the global handler
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};


// GET ALL ARTISTS 
router.get('/', asyncHandler(async (req, res) => {
    const artists = await Artist.find();
    res.json(artists);
}));

// GET ARTIST BY ID 
router.get('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist);
}));

// CREATE ARTIST 
router.post('/', authorize(['user', 'admin']), asyncHandler(async (req, res) => {
    if (!req.body.name) return res.status(400).json({ message: 'Artist name is required' });
    
    const artist = new Artist({
        name: req.body.name,
        country: req.body.country,
        albums: req.body.albums || []
    });
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
}));

// UPDATE ARTIST 
router.put('/:id', validateObjectId, authorize(['user', 'admin']), asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    if (req.body.name) artist.name = req.body.name;
    if (req.body.country) artist.country = req.body.country;

    const updatedArtist = await artist.save();
    res.json(updatedArtist);
}));

// DELETE ARTIST 
router.delete('/:id', validateObjectId, authorize('admin'), asyncHandler(async (req, res) => {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json({ message: 'Artist deleted successfully' });
}));



// ADD ALBUM TO ARTIST 
router.post('/:id/albums', validateObjectId, authorize(['user', 'admin']), asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    if (!req.body.title || !req.body.year) {
        return res.status(400).json({ message: 'Album title and year are required' });
    }

    const newAlbum = {
        title: req.body.title,
        year: req.body.year,
        songs: req.body.songs || []
    };

    artist.albums.push(newAlbum);
    await artist.save();
    res.status(201).json(artist);
}));

// GET ALL ALBUMS OF AN ARTIST 
router.get('/:id/albums', validateObjectId, asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist.albums);
}));

// GET SPECIFIC ALBUM 
router.get('/:id/albums/:albumId', validateObjectId, asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.json(album);
}));

// UPDATE ALBUM 
router.put('/:id/albums/:albumId', validateObjectId, authorize(['user', 'admin']), asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    if (req.body.title) album.title = req.body.title;
    if (req.body.year) album.year = req.body.year;

    await artist.save();
    res.json(album);
}));

// DELETE ALBUM 
router.delete('/:id/albums/:albumId', validateObjectId, authorize('admin'), asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    album.deleteOne();
    await artist.save();
    res.json({ message: 'Album deleted successfully' });
}));




// ADD SONG TO ALBUM 
router.post('/:id/albums/:albumId/songs', validateObjectId, authorize(['user', 'admin']), asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    if (!req.body.title || !req.body.duration) {
        return res.status(400).json({ message: 'Song title and duration are required' });
    }

    const newSong = {
        title: req.body.title,
        duration: req.body.duration,
        genre: req.body.genre
    };

    album.songs.push(newSong);
    await artist.save();
    res.status(201).json(album);
}));

// GET ALL SONGS OF AN ALBUM 
router.get('/:id/albums/:albumId/songs', validateObjectId, asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.json(album.songs);
}));

// GET SPECIFIC SONG 
router.get('/:id/albums/:albumId/songs/:songId', validateObjectId, asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    const song = album.songs.id(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
}));

// UPDATE SONG 
router.put('/:id/albums/:albumId/songs/:songId', validateObjectId, authorize(['user', 'admin']), asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    const song = album.songs.id(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    if (req.body.title) song.title = req.body.title;
    if (req.body.duration) song.duration = req.body.duration;
    if (req.body.genre) song.genre = req.body.genre;

    await artist.save();
    res.json(song);
}));

// DELETE SONG 
router.delete('/:id/albums/:albumId/songs/:songId', validateObjectId, authorize('admin'), asyncHandler(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const album = artist.albums.id(req.params.albumId);
    if (!album) return res.status(404).json({ message: 'Album not found' });

    const song = album.songs.id(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    song.deleteOne();
    await artist.save();
    res.json({ message: 'Song deleted successfully' });
}));

module.exports = router; 
