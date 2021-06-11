const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

router.use(auth);

const product = require('../controllers/ProductController');
router.get('/myproduct', product.myProduct);

module.exports = router;