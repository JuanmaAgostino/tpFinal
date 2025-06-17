import { useState, useEffect } from "react";
import { useSecretario } from "../../hooks/Secretario/useSecretario";
import axios from "axios";
import { localhost, alumnosEndpoint, usuariosEndpoint } from "../../routes/rutas";

export default function SecretarioCrudMain() {
  const {
    crearUsuario,
    crearAlumno,
    editarUsuario,
    editarAlumno,
    alumnosConUsuarios,
    fetchAlumnosConUsuarios,
    loading,
    error,
  } = useSecretario();

  // Estados para creación
  const [nuevoUsuario, setNuevoUsuario] = useState({ Usuario: "", Contraseña: "", Email: "" });
  const [nuevoAlumno, setNuevoAlumno] = useState({ nombre: "", apellido: "", Legajo: "", idUsuario: "" });
  const [usuarioCreado, setUsuarioCreado] = useState(null);

  // Estados para edición
  const [editando, setEditando] = useState(null); // { idAlumno, idUsuario }
  const [formUsuario, setFormUsuario] = useState({ Usuario: "", Contraseña: "", Email: "" });
  const [formAlumno, setFormAlumno] = useState({ nombre: "", apellido: "", Legajo: "" });

  // Buscador por legajo
  const [busquedaLegajo, setBusquedaLegajo] = useState("");

  useEffect(() => {
    fetchAlumnosConUsuarios();
  }, []);

  // Crear usuario y luego alumno
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    const res = await crearUsuario(nuevoUsuario);
    if (res && res.idUsuario) {
      setUsuarioCreado(res.idUsuario);
      setNuevoAlumno({ ...nuevoAlumno, idUsuario: res.idUsuario });
    }
  };

  const handleCrearAlumno = async (e) => {
    e.preventDefault();
    await crearAlumno(nuevoAlumno);
    setUsuarioCreado(null);
    setNuevoUsuario({ Usuario: "", Contraseña: "", Email: "" });
    setNuevoAlumno({ nombre: "", apellido: "", Legajo: "", idUsuario: "" });
    fetchAlumnosConUsuarios();
  };

  // Editar usuario y alumno
  const handleEditar = (alumno) => {
    setEditando({ idAlumno: alumno.idAlumno, idUsuario: alumno.idUsuario });
    setFormUsuario({ Usuario: alumno.Usuario, Contraseña: "", Email: alumno.Email });
    setFormAlumno({ nombre: alumno.nombre, apellido: alumno.apellido, Legajo: alumno.Legajo });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (editando) {
      await editarUsuario(editando.idUsuario, formUsuario);
      await editarAlumno(editando.idAlumno, formAlumno);
      setEditando(null);
      fetchAlumnosConUsuarios();
    }
  };

  // Eliminar usuario y alumno juntos
  const handleEliminar = async (idAlumno, idUsuario) => {
    if (!window.confirm("¿Seguro que deseas eliminar este alumno y su usuario?")) return;
    try {
      await axios.delete(`${localhost}${alumnosEndpoint}/${idAlumno}`);
      await axios.delete(`${localhost}${usuariosEndpoint}/${idUsuario}`);
      fetchAlumnosConUsuarios();
    } catch (err) {
      alert("Error al eliminar alumno y usuario");
    }
  };

  // Filtrado por legajo
  const alumnosFiltrados = alumnosConUsuarios.filter(a =>
    !busquedaLegajo ||
    (a.Legajo && a.Legajo.toString().includes(busquedaLegajo))
  );

  return (
    <div>
      <h2>Secretaría - Gestión de Usuarios y Alumnos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Formulario para crear usuario */}
      <form onSubmit={handleCrearUsuario}>
        <h3>Crear Usuario (Alumno)</h3>
        <input
          name="Usuario"
          placeholder="Usuario"
          value={nuevoUsuario.Usuario}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, Usuario: e.target.value })}
          disabled={usuarioCreado !== null}
        />
        <input
          name="Contraseña"
          placeholder="Contraseña"
          type="password"
          value={nuevoUsuario.Contraseña}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, Contraseña: e.target.value })}
          disabled={usuarioCreado !== null}
        />
        <input
          name="Email"
          placeholder="Email"
          value={nuevoUsuario.Email}
          onChange={e => setNuevoUsuario({ ...nuevoUsuario, Email: e.target.value })}
          disabled={usuarioCreado !== null}
        />
        <button type="submit" disabled={usuarioCreado !== null}>Crear Usuario</button>
      </form>

      {/* Formulario para crear alumno solo si ya se creó el usuario */}
      {usuarioCreado && (
        <form onSubmit={handleCrearAlumno}>
          <h3>Crear Alumno para Usuario ID {usuarioCreado}</h3>
          <input
            name="nombre"
            placeholder="Nombre"
            value={nuevoAlumno.nombre}
            onChange={e => setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value })}
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={nuevoAlumno.apellido}
            onChange={e => setNuevoAlumno({ ...nuevoAlumno, apellido: e.target.value })}
          />
          <input
            name="Legajo"
            placeholder="Legajo"
            value={nuevoAlumno.Legajo}
            onChange={e => setNuevoAlumno({ ...nuevoAlumno, Legajo: e.target.value })}
          />
          <button type="submit">Crear Alumno</button>
        </form>
      )}

      <h3>Listado de Alumnos y Usuarios</h3>
      {/* Buscador por legajo */}
      <input
        type="text"
        placeholder="Buscar por Legajo"
        value={busquedaLegajo}
        onChange={e => setBusquedaLegajo(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <ul>
        {alumnosFiltrados.map((a) => (
          <li key={a.idAlumno}>
            {a.nombre} {a.apellido} - Legajo: {a.Legajo} - Usuario: {a.Usuario} - Email: {a.Email}
            <button onClick={() => handleEditar(a)}>Editar</button>
            <button onClick={() => handleEliminar(a.idAlumno, a.idUsuario)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Formulario de edición */}
      {editando && (
        <form onSubmit={handleGuardar}>
          <h3>Editar Usuario</h3>
          <input
            name="Usuario"
            placeholder="Usuario"
            value={formUsuario.Usuario}
            onChange={e => setFormUsuario({ ...formUsuario, Usuario: e.target.value })}
          />
          <input
            name="Contraseña"
            placeholder="Nueva contraseña"
            type="password"
            value={formUsuario.Contraseña}
            onChange={e => setFormUsuario({ ...formUsuario, Contraseña: e.target.value })}
          />
          <input
            name="Email"
            placeholder="Email"
            value={formUsuario.Email}
            onChange={e => setFormUsuario({ ...formUsuario, Email: e.target.value })}
          />
          <h3>Editar Alumno</h3>
          <input
            name="nombre"
            placeholder="Nombre"
            value={formAlumno.nombre}
            onChange={e => setFormAlumno({ ...formAlumno, nombre: e.target.value })}
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={formAlumno.apellido}
            onChange={e => setFormAlumno({ ...formAlumno, apellido: e.target.value })}
          />
          <input
            name="Legajo"
            placeholder="Legajo"
            value={formAlumno.Legajo}
            onChange={e => setFormAlumno({ ...formAlumno, Legajo: e.target.value })}
          />
          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
}