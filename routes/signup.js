const express = require("express");
const router = express.Router();
const controller = require("../controllers/signup_controller");

router.get("/", controller.page);
router.post("/create", controller.create);

module.exports = router;