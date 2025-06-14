import React, { useEffect, useState } from 'react'
import { useCursos } from "../../hooks/cursos/useCursos";

export default function CursoPage() {
  const {
    cursos,
    cursoDocente,
    error,
    loading,
    inscribirseEnCurso,
    obtenerDocentesPorCurso
  } = useCursos();

  const [alumnoId, setAlumnoId] = useState(null);

  useEffect(() => {

    fetch("http://localhost:3001/alumnos/me")
      .then(res => res.json())
      .then(data => setAlumnoId(data.idAlumno));
  }, []);

  return (
    <div>
      <h2>Cursos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            {curso.Nombre} - {curso.Materias} - {curso.Titulo} - {curso.Proyecto === 1 ? "Sí tiene proyecto final" : "No tiene proyecto final"}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                alert(`Detalles del curso: ${curso.Materias} - ${curso.Materias} - ${curso.Proyecto === 1 ? "Sí tiene proyecto final" : "No tiene proyecto final"}`);
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