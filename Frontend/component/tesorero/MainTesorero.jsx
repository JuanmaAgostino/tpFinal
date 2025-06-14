import React from "react";
import { usePagosAlumnos } from "../../hooks/tesorero/usePagosAlumnos.jsx";

export default function MainTesorero() {
  const { datos, loading, error } = usePagosAlumnos();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Estado de Pagos de Alumnos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Legajo</th>
            <th>Curso</th>
            <th>Estado de Pago</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((alumno, idx) => (
            <tr key={idx}>
              <td>{alumno.nombreAlumno}</td>
              <td>{alumno.apellidoAlumno}</td>
              <td>{alumno.Legajo}</td>
              <td>{alumno.nombreCurso}</td>
              <td>{alumno.estadoPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}