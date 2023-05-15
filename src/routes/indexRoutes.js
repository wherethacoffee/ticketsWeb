const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');


router.get('/', indexController.iniciar);
router.get('/toLogin', indexController.toLogin);
router.get('/toAgendar', indexController.toAgendar);
router.get('/toCURP', indexController.toVerEstado);
router.post('/validarCURP', indexController.validarCURP);
router.post('/auth', indexController.auth);
module.exports = router;