const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla horario
const mostrarHorario = (req, res) => {

    //consulta sql que trae todo de la tabla horario
    const query = "SELECT * FROM horario;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los horarios: ", err);
            return res.status(500).json({ error: "Error al obtener los horarios" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
    
}


//exporto los resultados de las consultas
module.exports = { mostrarHorario }