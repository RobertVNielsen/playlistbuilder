const express = require("express");
const router = express.Router();
const controller = require("../controllers/share_controller");

router.get("/:id", controller.page);
router.post("/:id", controller.share);

module.exports = router;