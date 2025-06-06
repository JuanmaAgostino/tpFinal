const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla asistencia
const mostrarAsistencia = (req, res) => {

    //consulta sql que trae todo de la tabla asistencia
    const query = "SELECT * FROM asistencia;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener las asistencia: ", err);
            return res.status(500).json({ error: "Error al obtener las asistencias" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}


//exporto los resultados de las consultas
module.exports = { mostrarAsistencia }