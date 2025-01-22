const express = require("express");
const router = express.Router();
const endcapController = require("../controllers/endcapController");
console.log("routes triggered");
router.get("/", /**ensureAuth, */ endcapController.getEndcap);

 router.get("/api", /**ensureAuth, */ endcapController.searchInventory);


module.exports = router;
