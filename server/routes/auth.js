const express = require("express");
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

// modularize the code by destructuring functions from routes
router.post('/register', register);
router.post('/login', login);
router.post('/me', authenticate, me);

module.exports = router;
