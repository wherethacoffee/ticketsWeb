const express = require('express');
const router = express.Router();

const municipioController = require('../controllers/municipioController');


router.get('/listar', municipioController.listar);
router.post('/add', municipioController.agregar);
router.get('/delete/:id', municipioController.eliminar);

module.exports = router;