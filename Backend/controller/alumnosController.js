const {connection} = require('../DataBase/DB');

//funcion para pedir todo de la tabla alumnos

const mostrarAlumnos = (req, res) =>{

    //consulta sql que trae todo de la tabla alumnos
    const query ="SELECT * FROM alumnos;";

     
    connection.query(query, (err, results) =>{
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los alumnos: ",err);
            return res.status(500).json({error : "Error al obtenr los alumnos"});
        }
        res.json(results);
    }
    )
}

module.exports = {mostrarAlumnos}