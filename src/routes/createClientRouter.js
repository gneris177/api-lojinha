const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const advertising = require('../controllers/advertisingController');

router.use(auth);
router.post('/create-client', advertising.createClient);


module.exports = router;