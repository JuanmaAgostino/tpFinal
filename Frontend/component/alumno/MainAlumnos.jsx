import React from 'react';
import {useAlumnos} from '../../hooks/useAlumnos'

const MainAlumnos = () => {
  const { alumnos, cargando } = useAlumnos();

  if (cargando) return <p>Cargando alumnos...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Listado de Alumnos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {alumnos.map((alumno) => (
          <div
            key={alumno.id}
            style={{
              border: '1px solid gray',
              borderRadius: '8px',
              padding: '10px',
              width: '200px',
            }}
          >
            <h4>{alumno.nombre}</h4>
            <p>apellido: {alumno.apellido}</p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainAlumnos;
