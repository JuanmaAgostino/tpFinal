const express = require ('express');
const router = express.Router();
const {MostrarCursoinfo} = require ('../controller/cursoInfoController');

//rutas de los distintas cosas que puedo hacer con los alumnos

// /alumnos es el nombre de la tabla a la que quiero ingresar

router.get("/cursoinfo", MostrarCursoinfo); //Muestro todos los alumnos




module.exports = router;