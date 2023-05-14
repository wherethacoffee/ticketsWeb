const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');


router.get('/listar', adminController.listar);
router.get('/inicio', adminController.iniciar);
router.post('/add', adminController.agregar);
router.get('/delete/:id', adminController.eliminar);

router.get('/update/:id', adminController.editar);
router.post('/update/:id', adminController.modificar);

module.exports = router;