const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const controller = require("../controllers/allplaylists_controller");
const { render } = require("pug");

router.get("/", auth, controller.displayPage)

router.post("/", auth, controller.postAddPlaylist)

router.post("/delete-playlist", auth, controller.postDeletePlaylist)

module.exports = router;