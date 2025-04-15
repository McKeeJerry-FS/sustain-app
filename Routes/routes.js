const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure the upload destination
const Garden = require('../Controllers/gardenController');
const journalController = require('../Controllers/journalController');
//const authenticateToken = require('../Middlewares/tokenMiddelware'); // Import the token middleware


// ******************************************************************
//                         View Routes
// ******************************************************************
router.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.user || null }); // Pass title and user
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', user: req.user || null }); // Pass title and user
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', user: req.user || null }); // Pass title and user
});

router.get('/dashboard',  (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

router.get('/garden',  (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('garden', { title: 'Garden', user: req.user });
});

router.get('/blog',  (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('blog', { title: 'Blog', user: req.user });
});

router.get('/journal',  (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('journal', { title: 'Journal', user: req.user });
});

router.get('/equipment', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('equipment', { title: 'Your Equipment', user: req.user });
});

router.get('/plants', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.render('plants', { title: 'Your PLants', user: req.user });
});

// ******************************************************************
//                         Journal Routes
// ******************************************************************

router.post('/journal/add', upload.single('image'), (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  journalController.addJournalEntry(req, res, next);
});

module.exports = router;