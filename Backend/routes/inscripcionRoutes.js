const express = require ('express');
const router = express.Router();
const {mostrarInscripciones, inscribir} = require ('../controller/inscripcionController');

//rutas de los distintas cosas que puedo hacer con los alumnos

// /inscripcion es el nombre de la tabla a la que quiero ingresar

router.get("/inscripciones", mostrarInscripciones); //Muestro todos las inscripciones
router.post("/cursosinfo/inscribir", inscribir);//realizo una inscripcion al curso



module.exports = router;