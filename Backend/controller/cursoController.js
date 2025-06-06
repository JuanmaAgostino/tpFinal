const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla cursos
const mostrarCursos = (req, res) => {

    //consulta sql que trae todo de la tabla cursos
    const query = "SELECT * FROM cursos;";

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


//exporto los resultados de las consultas
module.exports = { mostrarCursos }