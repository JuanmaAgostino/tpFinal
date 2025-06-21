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
    <div className="main-container">
      <h2 className="title">Listado de Alumnos</h2>

      {loading && <p className="info">Cargando...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="alumno-list">
        {alumnos.map((a) => (
          <li key={a.idAlumno} className="alumno-item">
            <span>{a.nombre} - {a.apellido} - {a.Legajo}</span>
            <div className="button-group">
              <button className="btn eliminar" onClick={() => eliminarAlumno(a.idAlumno)}>Eliminar</button>
              <button className="btn editar" onClick={() => {
                setForm({ nombre: a.nombre, apellido: a.apellido, Legajo: a.Legajo });
                setIdEditando(a.idAlumno);
                setModoEdicion(true);
              }}>
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="section-title">➕ Crear nuevo alumno</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input className="input" name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
        <input className="input" name="Legajo" type="number" placeholder="Legajo" value={form.Legajo} onChange={handleChange} />
        <button className="btn crear" type="submit">{modoEdicion ? "Guardar cambios" : "Crear"}</button>
      </form>

      <h3 className="section-title">🔍 Buscar alumno por ID</h3>
      <div className="buscar-box">
        <input className="input" type="text" placeholder="ID" value={idBuscar} onChange={(e) => setIdBuscar(e.target.value)} />
        <button className="btn buscar" onClick={() => buscarAlumnoPorId(idBuscar)}>Buscar</button>
      </div>

      {alumnoActual && (
        <div className="alumno-actual">
          <h4>Alumno encontrado:</h4>
          <p>{alumnoActual.nombre} - {alumnoActual.apellido} - Legajo: {alumnoActual.Legajo}</p>
        </div>
      )}
    </div>
  );
}

