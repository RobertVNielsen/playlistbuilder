const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const controller = require("../controllers/playlist_controller");

router.get("/:id", auth, controller.getDisplayPage)

router.post("/:id", auth, controller.postAddSong)

router.post("/delete-song/:id", auth, controller.postDeleteSong)

module.exports = router;