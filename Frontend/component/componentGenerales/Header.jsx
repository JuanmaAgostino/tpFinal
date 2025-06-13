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
        localStorage.removeItem("usuario"); // opcional si guardaste algo
        navigate(LOGINPAGE);
    };

    return (
        //agregar un boton de cerrar sesión que vuelva al estado inicial el zustand

        <div>
            <header style={{ backgroundImage: `url(${fondoHeader})` }}>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </header>
        </div>
    )
}

export default HeaderAlumnos;