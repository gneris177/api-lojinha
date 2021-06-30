const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/adsController");

router.use(auth);
router.post("/adsCreate", controller.create);

module.exports = router;
