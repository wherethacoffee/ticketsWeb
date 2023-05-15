const express = require('express');
const router = express.Router();

const municipioController = require('../controllers/municipioController');


router.get('/listar', municipioController.listar);
router.post('/add', municipioController.agregar);
router.get('/delete/:id', municipioController.eliminar);
router.get('/update/:id', municipioController.editar);
router.post('/update/:id', municipioController.modificar);


module.exports = router;'/update/:id'