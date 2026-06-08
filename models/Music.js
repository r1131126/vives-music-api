const mongoose = require('mongoose');

// Songs 
const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true }, // en segundos
    genre: { type: String }
});

// Albums 
const AlbumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    songs: [SongSchema] // Array de canciones incrustadas
});

//  Artists principal colection 
const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    albums: [AlbumSchema] 
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);

