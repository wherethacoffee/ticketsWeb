const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/listar', adminController.listar);
router.post('/add', adminController.agregar);
router.get('/delete/:id', adminController.eliminar);
router.get('/update/:id', adminController.editar);
router.post('/update/:id', adminController.modificar);

//Rutas para los agendados
router.get('/listarAgendados', adminController.listarAgendados);
router.get('/actualizarStatus/:curp', adminController.actualizarStatus);

module.exports = router;