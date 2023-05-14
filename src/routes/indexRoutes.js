const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');


router.get('/', indexController.iniciar);
router.get('/toLogin', indexController.toLogin);
router.get('/toAgendar', indexController.toAgendar);
router.post('/auth', indexController.auth);
module.exports = router;