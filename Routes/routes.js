const express = require('express');
const router = express.Router();
const Garden = require('../Controllers/gardenController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.user || null }); // Pass title and user
});



module.exports = router;