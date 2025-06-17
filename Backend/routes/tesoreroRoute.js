const express = require('express');
const router = express.Router();
const { obtenerEstadoPagosAlumnos, marcarComoPagado, cambiarMetodoPago } = require('../controller/tesoreroController');

router.get('/tesorero/alumnos-pagos', obtenerEstadoPagosAlumnos);
router.post('/tesorero/marcar-pagado', marcarComoPagado);
router.post('/tesorero/cambiar-metodo', cambiarMetodoPago);

module.exports = router;