import React, { useEffect } from 'react';
import { useCursos } from "../../hooks/cursos/useCursos";
import { useUserStore } from "../../context/guardarIdYRol";

export default function CursoPage() {
  const {
    cursoInfo,
    error,
    loading,
    CursoInfo,
    inscribirEnCursoInfo,
    cursosAlumno,
    getCursosAlumno 
  } = useCursos();

  const { id } = useUserStore();
  const idUsuario = id;

  // Cargar info de cursos y cursos del alumno al montar
  useEffect(() => {
    CursoInfo();
    if (idUsuario) {
      getCursosAlumno(idUsuario);
    }
  }, [idUsuario]);

  return (
    <div>
      <div>
        <h2>Cursos en los que estás inscripto</h2>
        {cursosAlumno.length === 0 ? (
          <p>No estás inscripto en ningún curso.</p>
        ) : (
          <ul>
            {cursosAlumno.map((curso, index) => (
              <li key={index}>
                <strong>{curso.nombreCurso}</strong> - {curso.Titulo}
                <br />
                Desde: {new Date(curso.FechaInicio).toLocaleDateString()} Hasta: {new Date(curso.FechaFin).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Información de Cursos</h2>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <ul>
          {cursoInfo.map((info, index) => (
            <li key={`${info.idCursoInfo}-${index}`} style={{ marginBottom: "20px" }}>
              <strong>{info.NombreCurso}</strong>
              <br />Materias: {info.Materias}
              <br />Título: {info.Titulo}
              <br />Proyecto final: {info.Proyecto === 1 ? "Sí tiene" : "No tiene"}
              <br />Fecha de inicio: {new Date(info.FechaInicio).toLocaleDateString()}
              <br />Fecha de fin: {new Date(info.FechaFin).toLocaleDateString()}
              <br />Hora de clase: {info.HoraClase}

              <div style={{ marginTop: "10px" }}>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    console.log("Voy a inscribir:", { idUsuario, idCursoInfo: info.idCursoInfo });
                    if (idUsuario) {
                      inscribirEnCursoInfo(idUsuario, info.idCursoInfo);
                    } else {
                      alert("No se encontró usuario logueado");
                    }
                  }}
                >
                  Inscribirse
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
