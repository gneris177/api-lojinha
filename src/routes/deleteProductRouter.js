const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

router.use(auth);

const product = require('../controllers/ProductController');
router.delete('/deleteproduct', product.delete);

module.exports = router;