const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String },
    category: { type: String, required: true },
    region: { type: String },
    image: { type: String }, // Stores Cloudinary image URL
    audio: { type: String }, // Stores Cloudinary audio URL
    lyrics: { type: String, required: true },
    imagePrompt: { type: String, },

});

module.exports = mongoose.model("Song", SongSchema);
