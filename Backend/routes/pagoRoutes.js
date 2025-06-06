const express = require ('express');
const router = express.Router();
const {mostrarPagos} = require ('../controller/pagoController');

//rutas de los distintas cosas que puedo hacer con los Pagos

// /pago es el nombre de la tabla a la que quiero ingresar

router.get("/pago", mostrarPagos); //Muestro todos los Pagos




module.exports = router;