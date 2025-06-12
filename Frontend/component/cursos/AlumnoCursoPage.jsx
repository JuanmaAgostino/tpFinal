import React, { useEffect, useState } from 'react'
import { useCursos } from "../../hooks/cursos/useCursos";

export default function CursoPage() {
  const {
    cursos,
    error,
    loading,
    inscribirseEnCurso,
  } = useCursos();

  const [alumnoId, setAlumnoId] = useState(null);

  useEffect(() => {
    // Aquí deberías hacer una petición a tu backend para obtener el alumno logueado
    // Por ejemplo:
    fetch("http://localhost:3001/alumnos/me") // Ajusta la URL según tu backend
      .then(res => res.json())
      .then(data => setAlumnoId(data.idAlumno)); // Ajusta el campo según tu BD
  }, []);

  return (
    <div>
      <h2>Cursos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            {curso.Nombre} - {curso.Descripcion} - {curso.Cupo} - {curso.Docente}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                // Aquí podrías redirigir a una página de detalles del curso
                alert(`Detalles del curso: ${curso.Materias} - ${curso.Cupo} - ${curso.Docente}`);
              }}
            >
              Ver Detalles
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                if (alumnoId) {
                  inscribirseEnCurso(alumnoId, curso.id);
                } else {
                  alert("No se pudo obtener el alumno logueado.");
                }
              }}
            >
              Inscribirse
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}