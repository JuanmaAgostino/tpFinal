const { connection } = require('../DataBase/DB');

const mostrarCursosPorAlumno = (req, res) => {
    const idAlumno = req.params.idAlumno; // recibo idAlumno por params

    const query = `
    SELECT
      a.nombre AS nombreAlumno,
      a.apellido AS apellidoAlumno,
      a.Legajo,
      c.Nombre AS nombreCurso,
      c.Titulo,
      ci.FechaInicio,
      ci.FechaFin
    FROM inscripcion i
    JOIN curso_alumnos ca ON i.idCursoAlumno = ca.idCursoAlumno
    JOIN alumno a ON ca.idAlumno = a.idAlumno
    JOIN curso_info ci ON ca.idCursoInfo = ci.idCursoInfo
    JOIN curso c ON ci.idCurso = c.idCurso
    WHERE a.idAlumno = ?;
  `;

    connection.query(query, [idAlumno], (err, results) => {
        if (err) {
            console.error("Error al obtener cursos por alumno:", err);
            return res.status(500).json({ error: "Error al obtener cursos por alumno" });
        }
        res.json(results);
    });
};

module.exports = { mostrarCursosPorAlumno };
