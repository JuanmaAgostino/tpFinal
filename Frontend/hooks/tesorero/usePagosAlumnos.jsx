import { useState, useEffect } from "react";
import axios from "axios";


export function usePagosAlumnos(filtro) {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = "http://localhost:3001/tesorero/alumnos-pagos";
    if (filtro) url += `?estado=${filtro}`;
    axios.get(url)
      .then(res => {
        setDatos(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error al obtener datos");
        setLoading(false);
      });
  }, [filtro]);

  return { datos, loading, error };
}