require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const songRoutes = require("./routes/songs");
const authRoutes = require("./routes/user.routes.js");
const mongoose = require("mongoose");
const { songs, seedSongs } = require("./seeds/songSeed");
const Song = require("./models/Song");
const Playlist = require("./models/Playlist");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.user = req.user; // Set req.user to res.locals.user
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(bodyParser.json());
app.use(cookieParser());
app.use(songRoutes);
app.use(authRoutes);

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
  res.render("index", { songs: songs });
});

const port = 8000;
app.listen(port, () => {
  console.log(`server at localhost:${port}`);
});
