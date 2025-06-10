const { connection } = require('../DataBase/DB');

//funcion para pedir todo de la tabla alumnos
const mostrarAlumnos = (req, res) => {

    //consulta sql que trae todo de la tabla alumnos
    const query = "SELECT * FROM tpfinal.alumno;";

    //mostramos lo que devuelve la conexion
    connection.query(query, (err, results) => {
        // console.log("resultados de la consulta: ", results)
        if (err) {
            console.error("Error al obtener los alumnos: ", err);
            return res.status(500).json({ error: "Error al obtener los alumnos" });
        }
        //devuelvo los resultados de la query de la tabla
        res.json(results);
    }
    )

}

const obtenerAlumnoPorId = (req, res) => {
    const { id } = req.params;
    //console.log(id);
    const query = "SELECT * FROM tpfinal.alumno WHERE idAlumno  = ?";

    connection.query(query, [id], (err, results) => {
        //console.log(id);
        if (err) {
            // console.log(id);
            console.error("Error al obtener el alumno:", err);
            return res.status(500).json({ error: "Error al obtener el alumno" });
        }

        if (results.length === 0) {
            // console.log(id);
            return res.status(404).json({ mensaje: "Alumno no encontrado" });
        }

        res.json(results); // Devuelve solo un objeto, no array
    });
};

const eliminarAlumno = (req, res) => {
    const { id } = req.params;
   
    const query = "DELETE FROM tpfinal.alumno WHERE idAlumno= ?"

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar el alumno:", err);
            return res.status(500).json({ error: "error al eliminar el alumno" })
        }

        res.json({ mensaje: "alumno eliminado correctamente" })
    }

    )
}

const editarAlumno = (req, res) => {
    const { id } = req.params;
    const { nombre, email, edad } = req.body;
    const query = "UPDATE alumno SET nombre = ?, apellido = ?, Lsegajo = ? WHERE idAlumno = ?";
    connection.query(query, [nombre, email, edad, id], (err) => {
        if (err) {
            console.error("Error al actualizar alumno:", err);
            return res.status(500).json({ error: "Error al actualizar alumno" });
        }
        res.json({ mensaje: "Alumno actualizado correctamente" });
    });
};

const crearAlumno = (req, res) => {
    const { nombre, email, edad } = req.body;
    //verificar bien el nombre de los atributos 
    const query = "INSERT INTO alumno (nombre, apellido, Legajo) VALUES (?, ?, ?)";
    connection.query(query, [nombre, email, edad], (err, result) => {
        if (err) {
            console.error("Error al crear alumno:", err);
            return res.status(500).json({ error: "Error al crear alumno" });
        }
        res.status(201).json({ mensaje: "Alumno creado correctamente", id: result.insertId });
    });
};

//exporto los resultados de las consultas
module.exports = { mostrarAlumnos, obtenerAlumnoPorId, eliminarAlumno, editarAlumno, crearAlumno }