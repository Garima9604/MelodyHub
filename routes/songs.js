const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    const uniqueNames = await Playlist.distinct("name");
    res.render("index", {
      songs: songs,
      uniqueNames: uniqueNames,
    });
  } catch (error) {
    console.error("Error getting songs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
