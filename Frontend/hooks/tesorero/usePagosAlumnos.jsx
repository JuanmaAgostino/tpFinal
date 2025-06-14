import { useState, useEffect } from "react";
import axios from "axios";


export function usePagosAlumnos() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/tesorero/alumnos-pagos")
      .then(res => {
        setDatos(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error al obtener datos");
        setLoading(false);
      });
  }, []);

  return { datos, loading, error };
}