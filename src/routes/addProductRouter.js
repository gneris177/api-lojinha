const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const product = require('../controllers/productController');

router.use(auth);
router.post('/addproduct', product.add);


module.exports = router;