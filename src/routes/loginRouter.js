const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/usersController');

router.post('/login', controller.login);


module.exports = router;