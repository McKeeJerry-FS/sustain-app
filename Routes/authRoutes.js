const express = require('express');
const passport = require('passport');
const User = require('../Models/userModel'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).render('auth/login', {
        title: 'Login',
        error_msg: info.message || 'Invalid credentials',
        user: null,
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      console.log('User logged in:', user); // Log the logged-in user
      // Render the dashboard view and pass the user object
      res.render('dashboard', { title: 'Dashboard', user });
    });
  })(req, res, next);
});
// Handle registration form submission
router.post('/register', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body for debugging
    const { username, password, firstName, lastName, email } = req.body;

    // Create a new user (password will be hashed in the userModel's pre('save') middleware)
    const newUser = new User({
      username,
      password, // Pass the plain text password; it will be hashed by the middleware
      firstName,
      lastName,
      email,
    });

    // Save the user to the database
    await newUser.save();
    console.log('Saved user:', newUser); // Log the saved user

    // Send a success response
    res.status(200).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).render('auth/login', { 
        title: 'Login', 
        error_msg: 'Error logging out', 
        user: null 
      });
    }
    // Redirect to the login page after successful logout
    res.redirect('/auth/login');
  });
});

module.exports = router;