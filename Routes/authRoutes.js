const express = require('express');
const passport = require('passport');
const User = require('../Models/userModel'); 
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
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password }); // Log the login attempt

    // Find the user in the database
    const user = await User.findOne({ username });
    console.log('User found:', user); // Log the found user

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    console.log('Stored hashed password:', user.password); // Log the stored hashed password

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch); // Log the result of the comparison

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials'});
    }

    // If authentication is successful, send a success response
    res.status(200).json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
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

module.exports = router;