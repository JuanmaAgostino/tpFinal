const express = require ('express');
const router = express.Router();
const { listarHorarios, crearHorario, editarHorario, eliminarHorario } = require('../controller/horarioController');

// Rutas para manejar los horarios
// Estas rutas permiten listar, crear, editar y eliminar horarios

router.get("/horarios", listarHorarios);
router.post("/horarios", crearHorario);
router.put("/horarios/:id", editarHorario);
router.delete("/horarios/:id", eliminarHorario);

router.get("/horario", listarHorarios);




module.exports = router;