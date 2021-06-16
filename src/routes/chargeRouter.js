const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const payment = require('../controllers/paymentController');

router.use(auth);
router.post('/charge', payment.charge);


module.exports = router;