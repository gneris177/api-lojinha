const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const product = require("../controllers/productController");

router.use(auth);
router.post("/product-add", upload.single("productImg"), product.add);
router.get("/product-my", product.myProduct);
router.put("/product-update", product.update);
router.delete("/product-del", product.delete);

module.exports = router;
