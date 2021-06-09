const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.use(auth);

const product = require('../controllers/ProductController');

router.post('/addproduct', product.add)

module.exports = router;