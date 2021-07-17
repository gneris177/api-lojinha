const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const controller = require("../controllers/productController");

router.post("/product-add", upload.single("productImg"), controller.add);
router.get("/products", controller.products);

module.exports = router;
