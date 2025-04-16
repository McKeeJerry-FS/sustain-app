const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure the upload destination
const Garden = require('../Controllers/gardenController');
const journalController = require('../Controllers/journalController');
const ensureAuthorized = require('../Middlewares/ensureAuth'); // Import the token middleware


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

// router.post('/journal/add', upload.single('image'), (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect('/auth/login');
//   }
//   journalController.addJournalEntry(req, res, next);
// });

router.get('/journal/entries', ensureAuthenticated, journalController.getJournalEntries);
router.get('/journal/entries/:id', ensureAuthenticated, journalController.getJournalEntryById);

router.post('/journal/add', ensureAuthenticated, upload.single('image'), journalController.addJournalEntry);

module.exports = router;

function ensureAuthenticated(req, res, next) {
  // console.log('Is Authenticated:', req.isAuthenticated());
  // console.log('User:', req.user);
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, redirect to login page
  res.redirect('/auth/login');
}