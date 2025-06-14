const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla inscripciones
const mostrarInscripciones = (req, res) => {

    //consulta sql que trae todo de la tabla inscripciones
    const query = "SELECT * FROM inscripcion;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {

        if (err) {
            console.error("Error al obtener las inscripciones: ", err);
            return res.status(500).json({ error: "Error al obtener los inscripciones" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}

//funcion para inscribir al alumno
const inscribir = (req, res) => {
    const { idUsuario, idCursoInfo, idPago } = req.body;

    console.log("Voy a inscribir con:", { idUsuario, idCursoInfo, idPago });
    
    const query = `CALL InscribirAlumnoEnCurso_ConUsuario(?, ?, ?)`;
    connection.query(query, [idUsuario, idCursoInfo, idPago], (err, results) => {
        if (err) {

            console.error("Error al realizar la inscripcion", err);
            return res.status(500).json({ error: "error al realizar la inscripcion" });
        }
        res.json({ message: "Inscripción exitosa", results });
    });
};



//exporto los resultados de las consultas
module.exports = { mostrarInscripciones, inscribir }