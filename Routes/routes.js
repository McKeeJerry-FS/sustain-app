const express = require('express');
const router = express.Router();
const Garden = require('../Controllers/gardenController');

router.get('/', (req, res) => {
  res.render('index', { user: req.user }); // Pass the user object
});



module.exports = router;