const express = require ('express');
const router = express.Router();
const {mostrarDocenteCurso} = require ('../controller/docenteCursoController');

//rutas de los distintas cosas que puedo hacer con los docentes y cursos

// /alumnos es el nombre de la tabla a la que quiero ingresar

router.get("/alumnos", mostrarDocenteCurso); //Muestro todos los docentes y cursos




module.exports = router;