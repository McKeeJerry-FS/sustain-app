const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.render('dashboard', { title: 'Dashboard', user, token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).render('auth/login', { 
      title: 'Login', 
      error_msg: 'Error logging in. Please try again.', 
      user: null 
    });
  }
};