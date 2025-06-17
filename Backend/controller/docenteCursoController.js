const { connection } = require('../DataBase/DB');

// LISTAR cursos de un docente
const listarCursos = (req, res) => {
    const { idDocente } = req.body;

    const query = `
    SELECT 
  ci.idCursoInfo,
  c.Nombre AS nombreCurso
FROM 
  docente_curso dc
  JOIN docente d ON dc.idDocente = d.idDocente
  JOIN curso_info ci ON dc.idCursoInfo = ci.idCursoInfo
  JOIN curso c ON ci.idCurso = c.idCurso
WHERE 
  d.idUsuario = ?;`;

    connection.query(query, [idDocente], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al obtener cursos" });
        }
        res.json(results);
    });
};
const listarAsistencias = (req, res) => {
    const { idDocente, idCursoInfo } = req.body;
  
    const query = `
      SELECT  
        ca.idCursoAlumno, 
        a.Legajo, 
        a.nombre, 
        a.apellido, 
        asi.idAsistencia, 
        asi.estado, 
        ci.idCursoInfo, 
        c.Nombre AS nombreCurso
      FROM docente d
      JOIN docente_curso dc ON d.idDocente = dc.idDocente
      JOIN curso_info ci ON dc.idCursoInfo = ci.idCursoInfo
      JOIN curso_alumnos ca ON ca.idCursoInfo = ci.idCursoInfo
      JOIN alumno a ON a.idAlumno = ca.idAlumno
      JOIN asistencia asi ON asi.idAsistencia = ca.idAsistencia
      JOIN curso c ON c.idCurso = ci.idCurso
      WHERE d.idUsuario = ? AND ci.idCursoInfo = ?  -- 🔑 CAMBIA AQUÍ
    `;
  
    connection.query(query, [idDocente, idCursoInfo], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al obtener asistencias" });
      }
      res.json(results);
    });
  };

// ACTUALIZAR estado de asistencia
const actualizarAsistencia = (req, res) => {
    const { idAsistencia, estado } = req.body;

    const query = `UPDATE asistencia SET estado = ? WHERE idAsistencia = ?`;

    connection.query(query, [estado, idAsistencia], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al actualizar asistencia" });
        }
        res.json({ message: "Asistencia actualizada correctamente" });
    });
};

module.exports = { listarCursos, listarAsistencias, actualizarAsistencia };
