const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const controller = require("../controllers/playlist_controller");

router.get("/:id", auth, controller.getDisplayPage)

router.post("/playlist", auth, (req, res, next) => {
    
})

module.exports = router;