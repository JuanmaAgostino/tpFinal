import { useState } from "react";
import { useAdminDocentes } from "../../hooks/admin/useAdminDocentes";

export default function AdminDocentesCrud() {
  const { docentes, loading, error, crearDocente, editarDocente, eliminarDocente } = useAdminDocentes();
  const [form, setForm] = useState({ nombre: "", apellido: "", idUsuario: "" });
  const [editando, setEditando] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      editarDocente(editando, form);
      setEditando(null);
    } else {
      crearDocente(form);
    }
    setForm({ nombre: "", apellido: "", idUsuario: "" });
  };

  return (
    <div>
      <h2>Administracion de docentes</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {docentes.map((d) => (
          <li key={d.idDocente}>
            {d.nombre} {d.apellido} - idUsuario: {d.idUsuario}
            <button onClick={() => eliminarDocente(d.idDocente)}>Eliminar</button>
            <button onClick={() => {
              setForm({ nombre: d.nombre, apellido: d.apellido, idUsuario: d.idUsuario });
              setEditando(d.idDocente);
            }}>Editar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input name="idUsuario" placeholder="ID Usuario" value={form.idUsuario} onChange={handleChange} />
        <button type="submit">{editando ? "Guardar" : "Crear"}</button>
      </form>
    </div>
  );
}