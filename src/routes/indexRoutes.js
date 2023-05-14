const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');


router.get('/', indexController.iniciar);

module.exports = router;