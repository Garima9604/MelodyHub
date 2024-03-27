// routes/songs.js

const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Route to get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.render('index', { songs: songs }); // Pass the songs array to the template
  } catch (error) {
    console.error('Error getting songs:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
