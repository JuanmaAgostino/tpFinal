const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla inscripciones
const mostrarInscripciones = (req, res) => {

    //consulta sql que trae todo de la tabla inscripciones
    const query = "SELECT * FROM inscripcion;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener las inscripciones: ", err);
            return res.status(500).json({ error: "Error al obtener los inscripciones" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}


//exporto los resultados de las consultas
module.exports = { mostrarInscripciones }