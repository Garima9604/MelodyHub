const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  playlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

// Create a model for the songs using the schema
const Playlist = mongoose.model("Playlist", playlistSchema, "playlists");

module.exports = Playlist;
