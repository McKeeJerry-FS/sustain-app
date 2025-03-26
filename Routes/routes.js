const express = require('express');
const router = express.Router();
const Garden = require('../Controllers/gardenController');

router.get('/', Garden.index);

module.exports = router;