const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const product = require('../controllers/productController');

router.use(auth);
router.delete('/deleteproduct', product.delete);


module.exports = router;