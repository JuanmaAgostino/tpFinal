const express = require ('express');
const router = express.Router();
const {mostrarAsistencia} = require ('../controller/asistenciaController');

//rutas de los distintas cosas que puedo hacer con los alumnos

// /asistencia es el nombre de la tabla a la que quiero ingresar

router.get("/asistencia", mostrarAsistencia); //Muestro todos los alumnos




module.exports = router;