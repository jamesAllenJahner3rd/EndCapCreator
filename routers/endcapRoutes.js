const express = require("express");
const router = express.Router();
const endcapController = require("../controllers/endcapController");

router.get("/", /**ensureAuth, */ endcapController.getEndcap);

// router.get("/submit", /**ensureAuth, */ endcapController.searchInventory);

module.exports = router;
