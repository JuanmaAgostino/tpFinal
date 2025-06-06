const express = require ('express');
const router = express.Router();
const {mostrarCursos} = require ('../controller/cursoController');

//rutas de los distintas cosas que puedo hacer con los alumnos

// /cursos es el nombre de la tabla a la que quiero ingresar

router.get("/cursos",mostrarCursos); //muestro todos los cursos


module.exports = router;