import React from 'react';
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

  const handleLogoClick = () => {
    navigate(-1); // Retrocede a la página anterior
  };

  return (
    <header className="header-alumno">
      {/* Hacemos que el logo sea clickeable */}
      <div className="logo-alumno" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
      <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
    </header>
  );
};

export default HeaderAlumnos;
