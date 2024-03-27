const express = require("express");
const app = express();
const path = require("path");

//connect to database
const mongoose = require("mongoose");

const songRoutes = require("./routes/songs");

const Song = require("./models/Song");

const { songs, seedSongs } = require("./seeds/songSeed");

// Routes
app.use(songRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Music-Player", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    // Check if songs exist in the database
    const existingSongs = await Song.find();
    if (existingSongs.length === 0) {
      // Insert songs into the database if it's empty
      await Song.insertMany(songs);
      console.log("Songs inserted successfully");
    } else {
      console.log("Songs already exist in the database. Skipping insertion.");
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// seedDb();

// Middleware
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { songs: songs }); // Pass songs array to the EJS template
});

app.get("/playlists", (req, res) => {
  res.render("playlists"); // Render playlists.ejs
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
