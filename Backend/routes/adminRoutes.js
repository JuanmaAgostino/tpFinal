const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authAdmin = require('../middleware/authAdmin');

// CRUD de Alumnos
router.get('/alumnos', authAdmin, adminController.listarAlumnos);
router.post('/alumnos', authAdmin, adminController.crearAlumno);
router.put('/alumnos/:id', authAdmin, adminController.editarAlumno);
router.delete('/alumnos/:id', authAdmin, adminController.eliminarAlumno);

// CRUD de Docentes
router.get('/docentes', authAdmin, adminController.listarDocentes);
router.post('/docentes', authAdmin, adminController.crearDocente);
router.put('/docentes/:id', authAdmin, adminController.editarDocente);
router.delete('/docentes/:id', authAdmin, adminController.eliminarDocente);

// CRUD de Cursos
router.get('/cursos', authAdmin, adminController.listarCursos);
router.post('/cursos', authAdmin, adminController.crearCurso);
router.put('/cursos/:id', authAdmin, adminController.editarCurso);
router.delete('/cursos/:id', authAdmin, adminController.eliminarCurso);

module.exports = router;