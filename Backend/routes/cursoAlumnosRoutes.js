const express = require ('express');
const router = express.Router();
const {mostrarCursoAlumnos} = require ('../controller/alumnosCursoController');

//rutas de los distintas cosas que puedo hacer con los cursos y alumnos

// /curso_alumnos es el nombre de la tabla a la cual quiero ingresar

router.get("/curso_alumnos", mostrarCursoAlumnos); //Muestro todos los cursos y alumnos

module.exports = router;