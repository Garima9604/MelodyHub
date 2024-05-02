require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const songRoutes = require("./routes/songs");

app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");

const Song = require("./models/Song");

const Playlist = require("./models/Playlist");
const authRoutes = require("./routes/user.routes.js");

const { songs, seedSongs } = require("./seeds/songSeed");

// Middleware
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(songRoutes);
app.use(authRoutes);
// Route to add a new playlist
app.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const newPlaylist = new Playlist({ name });
    await newPlaylist.save();
  } catch (error) {
    console.error("Error adding playlist:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Music-Player")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.render("index", { songs: songs }); // Pass songs array to the EJS template
});
// Route to add a new playlist
app.post("/update", async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const newPlaylist = new Playlist({ name });
    await newPlaylist.save();
    // const newPlaylist = await Playlist.create({name});
  } catch (error) {
    console.error("Error adding playlist:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Route to delete a playlist
app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await Playlist.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/playlists", (req, res) => {
//   res.render("playlists", { songs: songs }); // Render playlists.ejs
// });

const port = 8000;
app.listen(port, () => {
  console.log(`server at https://localhost/${port}`);
});
