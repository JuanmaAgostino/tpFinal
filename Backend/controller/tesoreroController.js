const { connection } = require("../DataBase/DB");

const obtenerEstadoPagosAlumnos = (req, res) => {
const estado = req.query.estado;
let query = `
  SELECT 
    alumno.nombre AS nombreAlumno,
    alumno.apellido AS apellidoAlumno,
    alumno.Legajo,
    curso.Nombre AS nombreCurso,
    IF(pago.idPago IS NOT NULL, 'Pagado', 'Debe') AS estadoPago
  FROM alumno
  JOIN curso_alumnos ON alumno.idAlumno = curso_alumnos.idAlumno
  JOIN curso_info ON curso_alumnos.idCursoInfo = curso_info.idCursoInfo
  JOIN curso ON curso_info.idCurso = curso.idCurso
  LEFT JOIN inscripcion ON curso_alumnos.idCursoAlumno = inscripcion.idCursoAlumno
  LEFT JOIN pago ON inscripcion.idPago = pago.idPago
`;

if (estado === "Pagado" || estado === "Debe") {
  query += ` HAVING estadoPago = '${estado}'`;
}

connection.query(query, (err, results) => {
  if (err) {
    console.error("Error SQL:", err); // <-- Mira aquí el error real
    res.status(500).json({ error: "Error al obtener datos de pagos" });
  } else {
    res.json(results);
  }
});
};

module.exports = { obtenerEstadoPagosAlumnos };