const mongoose = require('mongoose');

// Esquema 1: Canciones (Incrustado)
const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true }, // en segundos
    genre: { type: String }
});

// Esquema 2: Albumes (Incrustado)
const AlbumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    songs: [SongSchema] // Array de canciones incrustadas
});

// Esquema 3: Artistas (Coleccion Principal)
const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    albums: [AlbumSchema] // Array de albumes incrustados
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);

