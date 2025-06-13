const express = require ('express');
const router = express.Router();
const {mostrarHorarioCurso, mostrarDocentesCurso} = require ('../controller/horarioCursoController');

//rutas de los distintas cosas que puedo hacer con los horarios de los cursos

router.get("/horarioCurso", mostrarHorarioCurso); //Muestro todos los horarios del curso

router.get("/horarioCurso/docentes", mostrarDocentesCurso); //Muestro los docentes que dan cada curso

module.exports = router;