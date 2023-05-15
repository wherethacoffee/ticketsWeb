const express = require('express');
const router = express.Router();

const alumnoController = require('../controllers/alumnoController');

router.get('/inicio', alumnoController.inicio);
router.post('/add', alumnoController.agregar);


module.exports = router;