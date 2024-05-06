const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");

// router.get("/playlist", async (req, res) => {
//   try {
//     let user = await Playlist.findById(req.user._id).populate("cart");

//     const productInfo = user.cart.map((product) => product.desc).join(",");
//     console.log(productInfo);
//     res.render("cart/cart", { user, totalAmount, productInfo });
//   } catch (e) {
//     res.status(500).render("error", { err: e.message });
//   }
// });

router.post("/playlist/:songId/add", async (req, res) => {
  try {
    let { songId } = req.params;
    // let userId = req.user._id;
    let song = await Song.findById(songId);
    // let user = await User.findById(userId);
    Playlist.playlist.push(song);
    await song.save();
    res.redirect("/");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});
