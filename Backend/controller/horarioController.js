const { connection } = require('../DataBase/DB');

const listarHorarios = (req, res) => {
  connection.query("SELECT * FROM horario", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener horarios" });
    res.json(results);
  });
};

const crearHorario = (req, res) => {
  const { horario } = req.body;
  connection.query("INSERT INTO horario (horario) VALUES (?)", [horario], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al crear horario" });
    res.status(201).json({ mensaje: "Horario creado", id: result.insertId });
  });
};

const editarHorario = (req, res) => {
  const { id } = req.params;
  const { horario } = req.body;
  connection.query("UPDATE horario SET horario=? WHERE idHorario=?", [horario, id], (err) => {
    if (err) return res.status(500).json({ error: "Error al editar horario" });
    res.json({ mensaje: "Horario actualizado" });
  });
};

const eliminarHorario = (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM horario WHERE idHorario=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar horario" });
    res.json({ mensaje: "Horario eliminado" });
  });
};

module.exports = { listarHorarios, crearHorario, editarHorario, eliminarHorario };