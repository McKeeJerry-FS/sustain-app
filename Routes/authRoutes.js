const express = require('express');
const passport = require('passport');
const { register, login } = require('../Controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local', { session: false }), login);

module.exports = router;