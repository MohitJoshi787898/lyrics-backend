const express = require("express");
const Song = require("../models/Song");
const { uploadImage, uploadAudio } = require("../config/cloudinary");

const router = express.Router();

// Upload Song with Image & Audio
router.post(
    "/",
    uploadImage.single("image"),
    uploadAudio.single("audio"),
    async (req, res) => {
        try {
            const { title, artist, category, region, lyrics, imagePrompt } = req.body;
            const image = req.file ? req.file.path : null; // Image URL from Cloudinary
            const audio = req.files?.audio ? req.files.audio[0].path : null; // Audio URL from Cloudinary

            if (!title || !artist || !category || !lyrics) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newSong = new Song({ title, artist, category, region, lyrics, image, audio, imagePrompt });
            await newSong.save();
            res.status(201).json(newSong);
        } catch (error) {
            res.status(500).json({ message: "Error adding song", error });
        }
    }
);

// Get All Songs
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching songs", error });
    }
});

module.exports = router;
