const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla Docentes
    const mostrarDocente = (req, res) => {

    //consulta sql que trae todo de la tabla docentes
    const query = "SELECT * FROM docente;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los docentes: ", err);
            return res.status(500).json({ error: "Error al obtener los docentes" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )
}

const crearDocente = (req, res) => {
    const { nombre, apellido} = req.body;
    //VER COMO INSERTAR EL ID DEL USUARIO//
    
    const query = "INSERT INTO docente (nombre, apellido, Usuarios_idUsuario) VALUES (?, ?, ?)";
    connection.query(query, [nombre, apellido], (err, result) => {
        if (err) {
            console.error("Error al crear alumno:", err);
            return res.status(500).json({ error: "Error al crear alumno" });
        }
        res.status(201).json({ mensaje: "Alumno creado correctamente", id: result.insertId });
    });
};


//exporto los resultados de las consultas
module.exports = { mostrarDocente }