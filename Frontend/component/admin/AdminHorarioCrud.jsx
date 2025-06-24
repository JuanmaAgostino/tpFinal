import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../../routes/rutas";

export default function AdminHorarioCrud() {
  const [horarios, setHorarios] = useState([]);
  const [horario, setHorario] = useState("");
  const [editando, setEditando] = useState(null);

  const fetchHorarios = async () => {
    const res = await axios.get(`${localhost}/horarios`);
    setHorarios(res.data);
  };

  useEffect(() => { fetchHorarios(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await axios.put(`${localhost}/horarios/${editando}`, { horario });
      setEditando(null);
    } else {
      await axios.post(`${localhost}/horarios`, { horario });
    }
    setHorario("");
    fetchHorarios();
  };

  const handleEditar = (h) => {
    setHorario(h.horario);
    setEditando(h.idHorario);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar horario?")) {
      await axios.delete(`${localhost}/horarios/${id}`);
      fetchHorarios();
    }
  };

  return (
    <div>
      <h2>CRUD de Horarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="time"
          value={horario}
          onChange={e => setHorario(e.target.value)}
          required
        />
        <button type="submit">{editando ? "Guardar" : "Crear"}</button>
        {editando && <button type="button" onClick={() => { setEditando(null); setHorario(""); }}>Cancelar</button>}
      </form>
      <ul>
        {horarios.map(h => (
          <li key={h.idHorario}>
            {h.horario}
            <button onClick={() => handleEditar(h)}>Editar</button>
            <button onClick={() => handleEliminar(h.idHorario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}