import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../../routes/rutas";
import "../../styles/AdminAlumnosCrud.css"; // Puedes crear uno específico si quieres

export default function AdminSecretariosCrud() {
  const [secretarios, setSecretarios] = useState([]);
  const [form, setForm] = useState({ Usuario: "", Contraseña: "", Email: "" });
  const [editando, setEditando] = useState(null);

  const fetchSecretarios = async () => {
    const res = await axios.get(`${localhost}/usuarios/secretarios`);
    setSecretarios(res.data);
  };

  useEffect(() => { fetchSecretarios(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await axios.put(`${localhost}/usuarios/${editando}`, form);
      setEditando(null);
    } else {
      await axios.post(`${localhost}/usuarios`, { ...form, Rol: "Secretario" });
    }
    setForm({ Usuario: "", Contraseña: "", Email: "" });
    fetchSecretarios();
  };

  const handleEditar = (s) => {
    setForm({ Usuario: s.Usuario, Contraseña: "", Email: s.Email });
    setEditando(s.idUsuario);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar secretario?")) {
      await axios.delete(`${localhost}/usuarios/${id}`);
      fetchSecretarios();
    }
  };

  return (
    <div className="admin-alumnos-container">
      <h2>Administración de Secretarios</h2>
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
        {secretarios.map(s => (
          <li key={s.idUsuario}>
            {s.Usuario} - {s.Email}
            <button onClick={() => handleEditar(s)}>Editar</button>
            <button onClick={() => handleEliminar(s.idUsuario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}