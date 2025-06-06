const express = require ('express');
const router = express.Router();
const {mostrarUsuarios} = require('../controller/usuarioController');

//rutas de los distintas cosas que puedo hacer con los alumnos

// /usuarios es el nombre de la tabla a la que quiero ingresar

router.get("/usuarios", mostrarUsuarios); //Muestro todos los alumnos




module.exports = router;