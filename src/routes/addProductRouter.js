const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const product = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.use(auth);
router.post("/addproduct", upload.single("productImg"), product.add);

module.exports = router;
