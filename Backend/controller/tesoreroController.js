const { connection } = require("../DataBase/DB");

const obtenerEstadoPagosAlumnos = (req, res) => {
  const estado = req.query.estado;
  let query = `
    SELECT 
      curso_alumnos.idCursoAlumno,
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
      console.error("Error SQL:", err);
      res.status(500).json({ error: "Error al obtener datos de pagos" });
    } else {
      res.json(results);
    }
  });
};

const marcarComoPagado = (req, res) => {
  const { idCursoAlumno, metodoPago } = req.body;
  if (!metodoPago) {
    return res.status(400).json({ error: "Debe seleccionar un método de pago" });
  }
  const queryPago = "INSERT INTO pago (monto, fechaPago, metodoPago) VALUES (?, NOW(), ?)";
  connection.query(queryPago, [0, metodoPago], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al crear pago" });
    const idPago = result.insertId;
    const queryUpdate = "UPDATE inscripcion SET idPago = ? WHERE idCursoAlumno = ?";
    connection.query(queryUpdate, [idPago, idCursoAlumno], (err2) => {
      if (err2) return res.status(500).json({ error: "Error al actualizar inscripción" });
      res.json({ success: true });
    });
  });
};

const cambiarMetodoPago = (req, res) => {
  const { idCursoAlumno, metodoPago } = req.body;
  const queryGetPago = `
    SELECT i.idPago FROM inscripcion i WHERE i.idCursoAlumno = ?
  `;
  connection.query(queryGetPago, [idCursoAlumno], (err, results) => {
    if (err || results.length === 0) return res.status(500).json({ error: "No se encontró el pago" });
    const idPago = results[0].idPago;
    const queryUpdate = "UPDATE pago SET metodoPago = ? WHERE idPago = ?";
    connection.query(queryUpdate, [metodoPago, idPago], (err2) => {
      if (err2) return res.status(500).json({ error: "Error al actualizar método de pago" });
      res.json({ success: true });
    });
  });
};

module.exports = { obtenerEstadoPagosAlumnos, marcarComoPagado, cambiarMetodoPago };