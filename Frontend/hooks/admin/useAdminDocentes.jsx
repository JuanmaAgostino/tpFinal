import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../../routes/rutas";

const API_URL = `${localhost}/admin/docentes`;

export function useAdminDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDocentes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setDocentes(res.data);
    } catch {
      setError("Error al obtener docentes");
    } finally {
      setLoading(false);
    }
  };

  const crearDocente = async (docente) => {
    try {
      await axios.post(API_URL, docente);
      fetchDocentes();
    } catch {
      setError("Error al crear docente");
    }
  };

  const editarDocente = async (id, docente) => {
    try {
      await axios.put(`${API_URL}/${id}`, docente);
      fetchDocentes();
    } catch {
      setError("Error al editar docente");
    }
  };

  const eliminarDocente = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDocentes();
    } catch {
      setError("Error al eliminar docente");
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  return { docentes, loading, error, crearDocente, editarDocente, eliminarDocente };
}