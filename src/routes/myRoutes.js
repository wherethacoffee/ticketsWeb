const express = require('express');
const router = express.Router();

const alumnoController = require('../controllers/alumnoController');

router.get('/', alumnoController.listar);

module.exports = router;