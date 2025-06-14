import React from 'react'
import '../../styles/HeaderYFooter.css'
import fondoHeader from '../../src/img/fondo.jpg';
import { useUserStore } from '../../context/guardarIdYRol';
import { useNavigate } from "react-router-dom";
import { LOGINPAGE } from '../../routes/rutas';






const HeaderAlumnos = () => {
    const { limpiarUsuario } = useUserStore();
    const navigate = useNavigate();

    // Si presiono el botón, limpio el zustand y redirecciono
    const handleLogout = () => {
        limpiarUsuario();
        localStorage.removeItem("usuario"); 
        navigate(LOGINPAGE);
    };

    return (
      
        <div>
            <header style={{ backgroundImage: `url(${fondoHeader})` }}>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </header>
        </div>
    )
}

export default HeaderAlumnos;