import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../../routes/rutas";

const API_URL = `${localhost}/admin/alumnos`;

export function useAdminAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAlumnos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setAlumnos(res.data);
    } catch {
      setError("Error al obtener alumnos");
    } finally {
      setLoading(false);
    }
  };

  const crearAlumno = async (alumno) => {
    try {
      await axios.post(API_URL, alumno);
      fetchAlumnos();
    } catch {
      setError("Error al crear alumno");
    }
  };

  const editarAlumno = async (id, alumno) => {
    try {
      await axios.put(`${API_URL}/${id}`, alumno);
      fetchAlumnos();
    } catch {
      setError("Error al editar alumno");
    }
  };

  const eliminarAlumno = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchAlumnos();
    } catch {
      setError("Error al eliminar alumno");
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return { alumnos, loading, error, crearAlumno, editarAlumno, eliminarAlumno };
}