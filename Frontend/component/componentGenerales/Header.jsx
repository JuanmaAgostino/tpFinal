import React from 'react'
import '../../styles/HeaderYFooter.css'
import fondoHeader from '../../src/img/fondo.jpg';

const HeaderAlumnos = () => {
    return (
        //agregar un boton de cerrar sesión que vuelva al estado inicial el zustand
        
        <div>
            <header style={{ backgroundImage: `url(${fondoHeader})` }}>
      {/* contenido */}
    </header>
        </div>
    )
}

export default HeaderAlumnos;