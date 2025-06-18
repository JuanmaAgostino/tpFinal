import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../../routes/rutas";

const API_URL = `${localhost}/admin/cursos`;

export function useAdminCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setCursos(res.data);
    } catch {
      setError("Error al obtener cursos");
    } finally {
      setLoading(false);
    }
  };

  const crearCurso = async (curso) => {
    try {
      await axios.post(API_URL, curso);
      fetchCursos();
    } catch {
      setError("Error al crear curso");
    }
  };

  const editarCurso = async (id, curso) => {
    try {
      await axios.put(`${API_URL}/${id}`, curso);
      fetchCursos();
    } catch {
      setError("Error al editar curso");
    }
  };

  const eliminarCurso = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCursos();
    } catch {
      setError("Error al eliminar curso");
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return { cursos, loading, error, crearCurso, editarCurso, eliminarCurso };
}