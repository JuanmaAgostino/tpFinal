const express = require('express');
const router = express.Router();
const { loginUsuario, crearUsuario, editarUsuario, eliminarUsuario } = require('../controller/usuarioController');

router.post("/login", loginUsuario); // POST /usuarios/login
router.post("/", crearUsuario); // POST /usuarios
router.put("/:id", editarUsuario); // PUT /usuarios/:id
router.delete("/:id", eliminarUsuario); // DELETE /usuarios/:id

module.exports = router;

//hacer una para buscar por id y guardar en el zustand!!!!!!!!!!!!!!!!!!!!!!