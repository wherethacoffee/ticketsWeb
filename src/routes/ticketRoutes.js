const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticketController');

router.get('/inicio/:curp', ticketController.mostrarTicket);

module.exports = router;
