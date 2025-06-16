const express = require('express');
const router = express.Router();
const { loginUsuario, crearUsuario, editarUsuario } = require('../controller/usuarioController');

router.post("/login", loginUsuario); // POST /usuarios/login
router.post("/", crearUsuario); // POST /usuarios
router.put("/:id", editarUsuario); // PUT /usuarios/:id

//hacer una para buscar por id y guardar en el zustand!!!!!!!!!!!!!!!!!!!!!!

module.exports = router;
