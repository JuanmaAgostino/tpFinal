const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controller/usuarioController');

router.post("/login", loginUsuario); // POST /usuarios/login

//hacer una para buscar por id y guardar en el zustand!!!!!!!!!!!!!!!!!!!!!!

module.exports = router;
