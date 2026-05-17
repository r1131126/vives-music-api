const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    year: { type: Number },
    genre: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Music', MusicSchema);
