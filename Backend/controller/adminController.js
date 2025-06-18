const { connection } = require('../DataBase/DB');

// --- ALUMNOS ---
const listarAlumnos = (req, res) => {
    connection.query('SELECT * FROM alumno', (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener alumnos" });
        res.json(results);
    });
};

const crearAlumno = (req, res) => {
    const { nombre, apellido, email } = req.body;
    connection.query(
        'INSERT INTO alumno (nombre, apellido, email) VALUES (?, ?, ?)',
        [nombre, apellido, email],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error al crear alumno" });
            res.status(201).json({ mensaje: "Alumno creado", id: result.insertId });
        }
    );
};

const editarAlumno = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email } = req.body;
    connection.query(
        'UPDATE alumno SET nombre=?, apellido=?, email=? WHERE idAlumno=?',
        [nombre, apellido, email, id],
        (err) => {
            if (err) return res.status(500).json({ error: "Error al editar alumno" });
            res.json({ mensaje: "Alumno actualizado" });
        }
    );
};

const eliminarAlumno = (req, res) => {
    const { id } = req.params;
    connection.query(
        'DELETE FROM alumno WHERE idAlumno=?',
        [id],
        (err) => {
            if (err) return res.status(500).json({ error: "Error al eliminar alumno" });
            res.json({ mensaje: "Alumno eliminado" });
        }
    );
};

// --- DOCENTES ---
const listarDocentes = (req, res) => {
    connection.query('SELECT * FROM docente', (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener docentes" });
        res.json(results);
    });
};

const crearDocente = (req, res) => {
    const { nombre, apellido, idUsuario } = req.body;
    connection.query(
        'INSERT INTO docente (nombre, apellido, idUsuario) VALUES (?, ?, ?)',
        [nombre, apellido, idUsuario],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error al crear docente" });
            res.status(201).json({ mensaje: "Docente creado", id: result.insertId });
        }
    );
};

const editarDocente = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido } = req.body;
    connection.query(
        'UPDATE docente SET nombre=?, apellido=? WHERE idDocente=?',
        [nombre, apellido, id],
        (err) => {
            if (err) return res.status(500).json({ error: "Error al editar docente" });
            res.json({ mensaje: "Docente actualizado" });
        }
    );
};

const eliminarDocente = (req, res) => {
    const { id } = req.params;
    connection.query(
        'DELETE FROM docente WHERE idDocente=?',
        [id],
        (err) => {
            if (err) return res.status(500).json({ error: "Error al eliminar docente" });
            res.json({ mensaje: "Docente eliminado" });
        }
    );
};

// --- CURSOS ---
const listarCursos = (req, res) => {
    connection.query('SELECT * FROM curso', (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener cursos" });
        res.json(results);
    });
};

const crearCurso = (req, res) => {
    const { Nombre, Materias, Titulo, Proyecto, Precio } = req.body;
    connection.query(
        'INSERT INTO curso (Nombre, Materias, Titulo, Proyecto, Precio) VALUES (?, ?, ?, ?, ?)',
        [Nombre, Materias, Titulo, Proyecto, Precio],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error al crear curso" });
            res.status(201).json({ mensaje: "Curso creado", id: result.insertId });
        }
    );
};

const editarCurso = (req, res) => {
    const { id } = req.params;
    const { Nombre, Materias, Titulo, Proyecto, Precio } = req.body;
    connection.query(
        'UPDATE curso SET Nombre=?, Materias=?, Titulo=?, Proyecto=?, Precio=? WHERE idCurso=?',
        [Nombre, Materias, Titulo, Proyecto, Precio, id],
        (err) => {
            if (err) return res.status(500).json({ error: "Error al editar curso" });
            res.json({ mensaje: "Curso actualizado" });
        }
    );
};

const eliminarCurso = (req, res) => {
    const { id } = req.params;
    connection.query(
        'DELETE FROM curso WHERE idCurso=?',
        [id],
        (err) => {
            if (err) return res.status(500).json({ error: "Error al eliminar curso" });
            res.json({ mensaje: "Curso eliminado" });
        }
    );
};

module.exports = {
    // Alumnos
    listarAlumnos, crearAlumno, editarAlumno, eliminarAlumno,
    // Docentes
    listarDocentes, crearDocente, editarDocente, eliminarDocente,
    // Cursos
    listarCursos, crearCurso, editarCurso, eliminarCurso
};