const express = require('express');
const router = express.Router();

/* const alumnoController = require('../controllers/alumnoController');
 */
const municipioController = require('../controllers/municipioController'); 

//const adminController = require('../controllers/adminController');


router.get('/', municipioController.inicio);

module.exports = router;