const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla pagos
const mostrarPagos = (req, res) => {

    //consulta sql que trae todo de la tabla pagos
        const query = "SELECT * FROM pago;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los pagos: ", err);
            return res.status(500).json({ error: "Error al obtener los pagos" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}


//exporto los resultados de las consultas
module.exports = { mostrarPagos }