const express = require('express');
const router = express.Router();
const Garden = require('../Controllers/gardenController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.user || null }); // Pass title and user
});

router.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});



module.exports = router;