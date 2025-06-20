import React from 'react'

import { useUserStore } from '../../context/guardarIdYRol';
import { useNavigate } from "react-router-dom";
import { LOGINPAGE } from '../../routes/rutas';
import '../../styles/Header.css'; // Estilos externos

const HeaderAlumnos = () => {
  const { limpiarUsuario } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    limpiarUsuario();
    localStorage.removeItem("usuario");
    navigate(LOGINPAGE);
  };

  return (
    <header className="header-alumno">
      <div className="logo-alumno" />
      <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
    </header>
  );
};

export default HeaderAlumnos;
