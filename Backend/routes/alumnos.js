const express = require ('express');
const router = express.Router();
const {mostrarAlumnos} = require ('../controller/alumnosController');

//rutas de los distintas cosas que puedo hacer con los alumnos

router.get("/alumnos", mostrarAlumnos); //Muestro todos los alumnos

module.exports = router;