import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ADMINALUMNOS, ADMINCURSOS, ADMINDOCENTES } from '../../routes/rutas';

const AdminMain = () => {
 const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Menú Principal</h1>
      <button onClick={() => navigate(ADMINALUMNOS)}>Alumnos</button>
      <button onClick={() => navigate(ADMINCURSOS)}>Cursos</button>
      <button onClick={() => navigate(ADMINDOCENTES)}>Docentes</button>
    </div>
  );
};

export default AdminMain;