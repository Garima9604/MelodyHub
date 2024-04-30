// routes/songs.js
const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Route to get all songs
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find();
    // Pass the songs array to the template
  } catch (error) {
    console.error('Error getting songs:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/playlist',async(req,res)=>{
  let name = req.body;
  await Playlist.create(name);
  res.redirect("/");
});

module.exports = router;
