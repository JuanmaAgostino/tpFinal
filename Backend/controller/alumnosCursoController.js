const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla curso_alumnos
const mostrarCursoAlumnos = (req, res) => {

    //consulta sql que trae todo de la tabla curso_alumnos
    const query = "SELECT * FROM curso_alumnos;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los alumnos: ", err);
            return res.status(500).json({ error: "Error al obtenr los Cursos y Alumnos" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}

//exporto los resultados de las consultas
module.exports = { mostrarCursoAlumnos }