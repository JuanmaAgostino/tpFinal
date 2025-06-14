const express = require ('express');
const router = express.Router();
const {mostrarCursosPorAlumno} = require ('../controller/alumnosCursoController');

//rutas de los distintas cosas que puedo hacer con los cursos y alumnos

// /curso_alumnos es el nombre de la tabla a la cual quiero ingresar

router.get('/cursos/alumno/:idAlumno', mostrarCursosPorAlumno);//muestro el alumno con el curso

module.exports = router;