const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const advertising = require('../controllers/advertisingController');

router.use(auth);
router.post('/charge', advertising.charge);


module.exports = router;