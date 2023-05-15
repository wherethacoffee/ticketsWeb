const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminIndexController');



router.get('/inicio', adminController.iniciar);
router.get('/CRUD_admin', adminController.toAdmin_CRUD);
router.get('/CRUD_municipio', adminController.toMunicipio_CRUD);
router.get('/graficaStatus', adminController.graficaStatus);
router.get('/graficaMunicipio', adminController.graficaMunicipio);
router.get('/agendar', adminController.toAgenda);
router.get('/logout', adminController.logout);

module.exports = router;