const express = require('express');
const router = express.Router();
const Garden = require('../Controllers/gardenController');
const authenticateToken = require('../Middlewares/tokenMiddelware'); // Import the token middleware

router.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.user || null }); // Pass title and user
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', user: req.user || null }); // Pass title and user
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', user: req.user || null }); // Pass title and user
});

router.get('/dashboard', authenticateToken,  (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

router.get('/garden', authenticateToken, (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('garden', { title: 'Garden', user: req.user });
});

router.get('/blog', authenticateToken, (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('blog', { title: 'Blog', user: req.user });
});

router.get('/equipment', authenticateToken, (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('equipment', { title: 'Your Equipment', user: req.user });
});
module.exports = router;