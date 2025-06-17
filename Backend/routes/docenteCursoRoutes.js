const express = require('express');
const router = express.Router();
const { listarCursos, listarAsistencias, actualizarAsistencia } = require('../controller/docenteCursoController');

// Listar cursos de un docente
router.post("/listarCursos", listarCursos);

// Listar asistencias de un curso
router.post("/listarAsistencias", listarAsistencias);

// Actualizar asistencia
router.put("/actualizarAsistencia", actualizarAsistencia);

module.exports = router;
