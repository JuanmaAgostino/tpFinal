const express = require ('express');
const router = express.Router();
const {mostrarInscripciones} = require ('../controller/inscripcionController');

//rutas de los distintas cosas que puedo hacer con los alumnos

// /inscripcion es el nombre de la tabla a la que quiero ingresar

router.get("/alumnos", mostrarInscripciones); //Muestro todos las inscripciones




module.exports = router;