import { useState } from "react";
import axios from "axios";
import { localhost, alumnosEndpoint, usuariosEndpoint } from "../../routes/rutas";

export function useSecretario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alumnosConUsuarios, setAlumnosConUsuarios] = useState([]);

  // Crear usuario con rol alumno
  const crearUsuario = async (usuarioData) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${localhost}${usuariosEndpoint}`, { ...usuarioData, Rol: "alumno" });
      setLoading(false);
      return res.data;
    } catch (err) {
      setError("Error al crear usuario");
      setLoading(false);
      return null;
    }
  };

  // Crear alumno asociado a usuario
  const crearAlumno = async (alumnoData) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${localhost}${alumnosEndpoint}`, alumnoData);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError("Error al crear alumno");
      setLoading(false);
      return null;
    }
  };

  // Editar usuario
  const editarUsuario = async (idUsuario, usuarioData) => {
    setLoading(true);
    setError("");
    try {
      await axios.put(`${localhost}${usuariosEndpoint}/${idUsuario}`, usuarioData);
      setLoading(false);
    } catch (err) {
      setError("Error al editar usuario");
      setLoading(false);
    }
  };

  // Editar alumno
  const editarAlumno = async (idAlumno, alumnoData) => {
    setLoading(true);
    setError("");
    try {
      await axios.put(`${localhost}${alumnosEndpoint}/${idAlumno}`, alumnoData);
      setLoading(false);
    } catch (err) {
      setError("Error al editar alumno");
      setLoading(false);
    }
  };

  // Traer alumnos con datos de usuario
  const fetchAlumnosConUsuarios = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${localhost}/alumnos-usuarios`);
      setAlumnosConUsuarios(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar alumnos");
      setLoading(false);
    }
  };

  return {
    crearUsuario,
    crearAlumno,
    editarUsuario,
    editarAlumno,
    alumnosConUsuarios,
    fetchAlumnosConUsuarios,
    loading,
    error,
  };
}