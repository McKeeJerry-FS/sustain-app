const express = require('express');
const passport = require('passport');
const { register, login } = require('../Controllers/authController');

const router = express.Router();

// Render login page
router.get('/login', (req, res) => {
  console.log('Rendering login page');
  res.render('auth/login', {title: 'Login', user: req.user || null}); // Pass title and user
});

// Render registration page
router.get('/register', (req, res) => {
  console.log('Rendering register page');
  res.render('auth/register', {title: 'Register', user: req.user || null}); // Pass title and user
});

// Handle login form submission
router.post('/login', passport.authenticate('local', { session: false }), login);

// Handle registration
router.post('auth/register', register);

module.exports = router;