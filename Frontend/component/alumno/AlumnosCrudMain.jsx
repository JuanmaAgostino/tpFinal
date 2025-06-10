import { useState } from "react";
import { useAlumnos } from "../../hooks/Alumnos/useAlumnos";

export default function MainAlumno() {
  const {
    alumnos,
    alumnoActual,
    error,
    loading,
    buscarAlumnoPorId,
    crearAlumno,
    eliminarAlumno,
    editarAlumno,
  } = useAlumnos();

  const [form, setForm] = useState({ nombre: "", apellido: "", Legajo: "" });
  const [idBuscar, setIdBuscar] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (modoEdicion) {
      editarAlumno(idEditando, form);
      setModoEdicion(false);
      setIdEditando(null);
    } else {
      crearAlumno(form);
    }
  
    setForm({ nombre: "", apellido: "", Legajo: "" });
  };
  

  return (
    <div>
      <h2>Listado de Alumnos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {alumnos.map((a) => (
          <li key={a.idAlumno}>
            {a.nombre} - {a.apellido} - {a.Legajo}
            <button onClick={() => eliminarAlumno(a.idAlumno)}>Eliminar</button>
            <button onClick={() => {
              setForm({ nombre: a.nombre, apellido: a.apellido, Legajo: a.Legajo });
              setIdEditando(a.idAlumno);
              setModoEdicion(true);
            }}>
              Editar
            </button>
          </li>
        ))}
      </ul>


      <h3>➕ Crear nuevo alumno</h3>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="apellido" value={form.apellido} onChange={handleChange} />
        <input name="Legajo" type="number" placeholder="Legajo" value={form.Legajo} onChange={handleChange} />
        <button type="submit">Crear</button>
      </form>

      <h3>🔍 Buscar alumno por ID</h3>
      <input type="text" placeholder="ID" value={idBuscar} onChange={(e) => setIdBuscar(e.target.value)} />
      <button onClick={() => buscarAlumnoPorId(idBuscar)}>Buscar</button>

      {alumnoActual && (
        <div key={alumnoActual.idAlumno}>
          <h4>Alumno encontrado:</h4>
          <p>
            {alumnoActual.nombre} - {alumnoActual.apellido} - Legajo: {alumnoActual.Legajo}
          </p>
        </div>
      )}

    </div>
  );
}
