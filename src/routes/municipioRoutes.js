const express = require('express');
const router = express.Router();

const municipioController = require('../controllers/municipioController');


router.get('/', municipioController.inicio);

module.exports = router;