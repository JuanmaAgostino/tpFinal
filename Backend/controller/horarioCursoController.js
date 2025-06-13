const { connection } = require("../DataBase/DB");

//funcion para pedir todo de la tabla horario_curso
const mostrarHorarioCurso = (req, res) => {
  //consulta sql que trae todo de la tabla horario_curso
  const query = "SELECT * FROM horario_curso;";

  //mostramos lo que devuelve la conexion
  connection.query(query, (err, results) => {
    console.log("resultados de la consulta: ", results);
    if (err) {
      console.error("Error al obtener los alumnos: ", err);
      return res.status(500).json({ error: "Error al obtener los alumnos" });
    }
    //devuelvo los resultados de la query de la tabla
    res.json(results);
  });
};

const mostrarDocentesCurso = (req, res) => {
  // Consulta sql para saber que profesor esta en cada curso
  const query2 =
    "SELECT curso_info.idCursoInfo, curso.Nombre AS nombreCurso, docente.nombre AS nombreDocente, docente.apellido AS apellidoDocente FROM curso_info JOIN docente_curso ON curso_info.idCursoInfo = docente_curso.idCursoInfo JOIN docente ON docente_curso.idDocente = docente.idDocente JOIN curso ON curso_info.idCurso = curso.idCurso;";

  //mostramos lo que devuelve la conexion
  connection.query(query2, (err, results) => {
    console.log("resultados de la consulta: ", results);
    if (err) {
      console.error("Error al obtener los docentes: ", err);
      return res.status(500).json({ error: "Error al obtener los docentes" });
    }
    //devuelvo los resultados de la query de la tabla
    res.json(results);
  });
};

const mostrarDocentesCursoPorID = (req, res) => {
    const query = ";";

}

//exporto los resultados de las consultas
module.exports = { mostrarHorarioCurso, mostrarDocentesCurso };
