import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../../routes/rutas";
import "../../styles/AdminAlumnosCrud.css"; // O crea uno específico si prefieres

export default function AdminTesorerosCrud() {
  const [tesoreros, setTesoreros] = useState([]);
  const [form, setForm] = useState({ Usuario: "", Contraseña: "", Email: "" });
  const [editando, setEditando] = useState(null);

  const fetchTesoreros = async () => {
    const res = await axios.get(`${localhost}/usuarios/tesoreros`);
    setTesoreros(res.data);
  };

  useEffect(() => { fetchTesoreros(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await axios.put(`${localhost}/usuarios/${editando}`, form);
      setEditando(null);
    } else {
      await axios.post(`${localhost}/usuarios`, { ...form, Rol: "Tesorero" });
    }
    setForm({ Usuario: "", Contraseña: "", Email: "" });
    fetchTesoreros();
  };

  const handleEditar = (t) => {
    setForm({ Usuario: t.Usuario, Contraseña: "", Email: t.Email });
    setEditando(t.idUsuario);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar tesorero?")) {
      await axios.delete(`${localhost}/usuarios/${id}`);
      fetchTesoreros();
    }
  };

  return (
    <div className="admin-alumnos-container">
      <h2>Administración de Tesoreros</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="Usuario"
          placeholder="Usuario"
          value={form.Usuario}
          onChange={e => setForm({ ...form, Usuario: e.target.value })}
          required
        />
        <input
          name="Contraseña"
          placeholder="Contraseña"
          type="password"
          value={form.Contraseña}
          onChange={e => setForm({ ...form, Contraseña: e.target.value })}
          required={!editando}
        />
        <input
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={e => setForm({ ...form, Email: e.target.value })}
          required
        />
        <button type="submit">{editando ? "Guardar" : "Crear"}</button>
        {editando && <button type="button" onClick={() => { setEditando(null); setForm({ Usuario: "", Contraseña: "", Email: "" }); }}>Cancelar</button>}
      </form>
      <ul>
        {tesoreros.map(t => (
          <li key={t.idUsuario}>
            {t.Usuario} - {t.Email}
            <button onClick={() => handleEditar(t)}>Editar</button>
            <button onClick={() => handleEliminar(t.idUsuario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}