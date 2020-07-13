const express = require("express");
const router = express.Router();
const controller = require("../controllers/login_controller");

router.get("/", controller.page)
router.post("/", controller.authenticate)
router.post("/logout", controller.logout)

module.exports = router;