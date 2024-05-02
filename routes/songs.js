// routes/songs.js

const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");

// Route to get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    const uniqueNames = await Playlist.distinct("name");
    console.log(uniqueNames);
    for (let uniqueName in uniqueNames) {
      console.log(uniqueNames[uniqueName]);
    }
    res.render("index", {
      songs: songs,
      uniqueNames: uniqueNames,
    }); // Pass the songs array to the template
  } catch (error) {
    console.error("Error getting songs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// router.post('/playlist',async(req,res)=>{
//   let name = req.body;
//   await Playlist.create(name);
//   res.redirect("/");
// });

module.exports = router;
