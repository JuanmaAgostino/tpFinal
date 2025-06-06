const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla cursoinfo
const MostrarCursoinfo = (req, res) => {

    //consulta sql que trae todo de la tabla cursoinfo
    const query = "SELECT * FROM cursoinfo;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los cursoinfo: ", err);
            return res.status(500).json({ error: "Error al obtener los cursoinfo" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}


//exporto los resultados de las consultas
module.exports = { MostrarCursoinfo }