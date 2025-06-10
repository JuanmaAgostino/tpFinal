import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ALUMNOSPAGE, DOCENTESPAGE, localhost, usuariosEndpoint, loginEndpoint } from "../routes/rutas";

// URL base y endpoint
const API_URL = `${localhost}${usuariosEndpoint}${loginEndpoint}`;

export function useLogin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (credenciales) => {
    try {
      const res = await axios.post(API_URL, credenciales);
      const usuario = res.data.usuario;

      // Redirección según rol
      if (usuario.Rol === "alumno") {
        navigate(ALUMNOSPAGE);
      } else if (usuario.Rol === "docente") {
        navigate(DOCENTESPAGE);
      } else {
        setError("Rol desconocido");
      }

      // Guardar usuario en localStorage si se desea
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (err) {
      console.error("Error al iniciar sesión:", err.response?.data || err.message);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return { login, error };
}
