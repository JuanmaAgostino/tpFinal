const express = require('express');
const router = express.Router();
const { loginUsuario, crearUsuario, editarUsuario, eliminarUsuario, listarSecretarios, listarTesoreros } = require('../controller/usuarioController');

router.post("/login", loginUsuario); // POST /usuarios/login
router.post("/", crearUsuario); // POST /usuarios
router.put("/:id", editarUsuario); // PUT /usuarios/:id
router.delete("/:id", eliminarUsuario); // DELETE /usuarios/:id

router.get("/secretarios", listarSecretarios);
router.get("/tesoreros", listarTesoreros); // GET /usuarios/tesoreros

module.exports = router;