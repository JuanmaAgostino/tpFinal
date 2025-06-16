const { connection } = require('../DataBase/DB');

const loginUsuario = (req, res) => {
    const { Usuario, Contraseña } = req.body;

    const query = "SELECT idUsuario, Usuario, Rol FROM tpfinal.usuarios WHERE Usuario = ? AND Contraseña = ?";
    connection.query(query, [Usuario, Contraseña], (err, results) => {
        if (err) {
            console.error("Error en login:", err);
            return res.status(500).json({ error: "Error al procesar login" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const usuario = results[0];
        res.status(200).json({ mensaje: "Login exitoso", usuario });
    });
};

// Crear usuario
const crearUsuario = (req, res) => {
    const { Usuario, Contraseña, Rol, Email } = req.body;
    const query = "INSERT INTO usuarios (Usuario, Contraseña, Rol, Email) VALUES (?, ?, ?, ?)";
    connection.query(query, [Usuario, Contraseña, Rol, Email], (err, result) => {
        if (err) {
            console.error("Error al crear usuario:", err);
            return res.status(500).json({ error: "Error al crear usuario" });
        }
        res.status(201).json({ mensaje: "Usuario creado correctamente", idUsuario: result.insertId });
    });
};

// Editar usuario
const editarUsuario = (req, res) => {
    const { id } = req.params;
    const { Usuario, Contraseña } = req.body;
    const query = "UPDATE usuarios SET Usuario = ?, Contraseña = ? WHERE idUsuario = ?";
    connection.query(query, [Usuario, Contraseña, id], (err) => {
        if (err) {
            console.error("Error al actualizar usuario:", err);
            return res.status(500).json({ error: "Error al actualizar usuario" });
        }
        res.json({ mensaje: "Usuario actualizado correctamente" });
    });
};

module.exports = { loginUsuario, crearUsuario, editarUsuario };
