import { useState } from "react";
import { useAdminAlumnos } from "../../hooks/admin/useAdminAlumnos";

export default function AdminAlumnosCrud() {
  const { alumnos, loading, error, crearAlumno, editarAlumno, eliminarAlumno } = useAdminAlumnos();
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "" });
  const [editando, setEditando] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      editarAlumno(editando, form);
      setEditando(null);
    } else {
      crearAlumno(form);
    }
    setForm({ nombre: "", apellido: "", email: "" });
  };

  return (
    <div>
      <h2>CRUD Alumnos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {alumnos.map((a) => (
          <li key={a.idAlumno}>
            {a.nombre} {a.apellido} - {a.email}
            <button onClick={() => eliminarAlumno(a.idAlumno)}>Eliminar</button>
            <button onClick={() => {
              setForm({ nombre: a.nombre, apellido: a.apellido, email: a.email });
              setEditando(a.idAlumno);
            }}>Editar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <button type="submit">{editando ? "Guardar" : "Crear"}</button>
      </form>
    </div>
  );
}