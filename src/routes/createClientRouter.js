const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const payment = require('../controllers/paymentController');

router.use(auth);
router.post('/create-client', payment.createClient);


module.exports = router;