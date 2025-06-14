const express = require('express');
const router = express.Router();
const { obtenerEstadoPagosAlumnos } = require('../controller/tesoreroController');

router.get('/tesorero/alumnos-pagos', obtenerEstadoPagosAlumnos);

module.exports = router;