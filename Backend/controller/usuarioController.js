const { connection } = require('../DataBase/DB');

const loginUsuario = (req, res) => {
    const { Usuario, Contraseña } = req.body;

    const query = "SELECT * FROM usuarios WHERE Usuario = ? AND Contraseña = ?";
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

module.exports = { loginUsuario };
