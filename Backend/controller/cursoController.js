const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla cursos
const mostrarCursos = (req, res) => {

    //consulta sql que trae todo de la tabla cursos
    const query = "SELECT * FROM tpfinal.Curso;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los cursos: ", err);
            return res.status(500).json({ error: "Error al obtener los cursos" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}
//traigo todo del join de cursos-horarios-cursoinfo
const mostrarCursosInfo = (req, res) => {
    const query = "SELECT ci.idCursoInfo, ci.FechaInicio, ci.FechaFin, ci.Descripcion, c.idCurso, c.Nombre AS NombreCurso, c.Materias, c.Titulo,  c.Proyecto, h.idHorario, h.horario AS HoraClase FROM curso_info ci JOIN curso c ON ci.idCurso = c.idCurso  JOIN horario_curso hc ON ci.idCursoInfo = hc.idCursoInfo JOIN horario h ON hc.idHorario = h.idHorario; "
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los cursos: ", err);
            return res.status(500).json({ error: "Error al obtener los datos solicitados" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}


//exporto los resultados de las consultas
module.exports = { mostrarCursos, mostrarCursosInfo }