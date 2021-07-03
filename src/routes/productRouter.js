const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const product = require("../controllers/productController");

router.use(auth);

router.post("/product-add", upload.single("productImg"), product.add);
router.get("/myproduct", product.myProduct);
router.delete("/deleteproduct", product.delete);
router.get("/products", product.products);
router.put("/editproduct", product.edit);

module.exports = router;
