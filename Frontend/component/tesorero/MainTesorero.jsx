import React, { useState } from "react";
import { usePagosAlumnos } from "../../hooks/tesorero/usePagosAlumnos.jsx";
import axios from "axios";

const METODOS_PAGO = ["Efectivo", "Tarjeta", "Transferencia", "Debito"];

export default function MainTesorero() {
  const [filtro, setFiltro] = useState(""); // "" | "Pagado" | "Debe"
  const [busquedaLegajo, setBusquedaLegajo] = useState("");
  const { datos, loading, error, refetch } = usePagosAlumnos(filtro);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState({});

  // Marcar como pagado (requiere método de pago seleccionado)
  const marcarPagado = async (idCursoAlumno) => {
    const metodoPago = metodoPagoSeleccionado[idCursoAlumno];
    if (!metodoPago) {
      alert("Por favor, selecciona el método de pago antes de marcar como pagado.");
      return;
    }
    await axios.post("http://localhost:3001/tesorero/marcar-pagado", { idCursoAlumno, metodoPago });
    setMetodoPagoSeleccionado(prev => {
      const nuevo = { ...prev };
      delete nuevo[idCursoAlumno];
      return nuevo;
    });
    refetch();
  };

  // Filtrado por legajo (si hay búsqueda)
  const datosFiltrados = datos.filter(alumno => {
    if (!busquedaLegajo) return true;
    return alumno.Legajo && alumno.Legajo.toString().includes(busquedaLegajo);
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Estado de Pagos de Alumnos</h2>
      {/* Filtro por estado */}
      <select value={filtro} onChange={e => setFiltro(e.target.value)}>
        <option value="">Todos</option>
        <option value="Pagado">Pagado</option>
        <option value="Debe">Debe</option>
      </select>
      {/* Buscador por legajo */}
      <input
        type="text"
        placeholder="Buscar por Legajo"
        value={busquedaLegajo}
        onChange={e => setBusquedaLegajo(e.target.value)}
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Legajo</th>
            <th>Curso</th>
            <th>Estado de Pago</th>
            <th>Método de Pago</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((alumno, idx) => (
            <tr key={idx}>
              <td>{alumno.nombreAlumno}</td>
              <td>{alumno.apellidoAlumno}</td>
              <td>{alumno.Legajo}</td>
              <td>{alumno.nombreCurso}</td>
              <td>{alumno.estadoPago}</td>
              <td>
                {alumno.estadoPago === "Debe" ? (
                  <select
                    value={metodoPagoSeleccionado[alumno.idCursoAlumno] || ""}
                    onChange={e =>
                      setMetodoPagoSeleccionado(prev => ({
                        ...prev,
                        [alumno.idCursoAlumno]: e.target.value
                      }))
                    }
                  >
                    <option value="">Seleccionar...</option>
                    {METODOS_PAGO.map(metodo => (
                      <option key={metodo} value={metodo}>{metodo}</option>
                    ))}
                  </select>
                ) : (
                  alumno.metodoPago || "-"
                )}
              </td>
              <td>
                {alumno.estadoPago === "Debe" && (
                  <button onClick={() => marcarPagado(alumno.idCursoAlumno)}>
                    Marcar como Pagado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}