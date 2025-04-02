const express = require('express');
const passport = require('passport');
const { register, login } = require('../Controllers/authController');

const router = express.Router();

// Render login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Handle login form submission
router.post('/login', passport.authenticate('local', { session: false }), login);

// Handle registration
router.post('/register', register);

module.exports = router;