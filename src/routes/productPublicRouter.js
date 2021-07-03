const express = require("express");
const router = express.Router();

const product = require("../controllers/productController");

router.get("/products", product.products);

module.exports = router; 