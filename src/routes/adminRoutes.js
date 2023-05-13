const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');


router.get('/', adminController.inicio);

module.exports = router;