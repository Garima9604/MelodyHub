const mongoose = require('mongoose');


const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Create a model for the songs using the schema
const Playlist = mongoose.model('Playlist', playlistSchema, 'playlists');

module.exports = Playlist;
