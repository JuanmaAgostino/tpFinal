import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ALUMNOSPAGE, DOCENTESPAGE, ADMINPAGE,TESOREROPAGE,SECRETARIOCRUDPAGE,localhost, usuariosEndpoint, loginEndpoint } from "../routes/rutas";
import { useUserStore } from "../context/guardarIdYRol";


export function useLogin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // URL base y endpoint
  const API_URL = `${localhost}${usuariosEndpoint}${loginEndpoint}`;
  //preparo el zustand para que guarde el id, rol y usuario.
  const setUsuario = useUserStore((state) => state.setUsuario);

  //busco si existe el usuario y si esta bien la contraseña
  const login = async (credenciales) => {
    try {
      const res = await axios.post(API_URL, credenciales);
      const usuario = res.data.usuario;

      // Redirección según rol
      if (usuario.Rol === "Alumno") {
        setUsuario(usuario);
        navigate(ALUMNOSPAGE);
      } else if (usuario.Rol === "Docente") {
        setUsuario(usuario);
        navigate(DOCENTESPAGE);
      } else if (usuario.Rol === "Admin") {
        setUsuario(usuario);
        navigate(ADMINPAGE);
      }else if (usuario.Rol === "Tesorero") {
        setUsuario(usuario);
        navigate(TESOREROPAGE);
      } else if (usuario.Rol === "Secretario") {
        setUsuario(usuario);
        navigate(SECRETARIOCRUDPAGE);
      }else {
        setError("Rol desconocido");
      }


    } catch (err) {
      console.error("Error al iniciar sesión:", err.response?.data || err.message);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return { login, error };
}
