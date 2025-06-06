const { connection } = require('../DataBase/DB');

    //funcion para pedir todo de la tabla pago
const mostrarUsuarios = (req, res) => {

    //consulta sql que trae todo de la tabla pago
    const query = "SELECT * FROM pago;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los usuarios: ", err);
            return res.status(500).json({ error: "Error al obtener los usuarios" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}


//exporto los resultados de las consultas
module.exports = { mostrarUsuarios }