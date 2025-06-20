import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMINALUMNOS, ADMINCURSOS, ADMINDOCENTES } from '../../routes/rutas';
import '../../styles/AdminMain.css';

const AdminMain = () => {
	const navigate = useNavigate();

	return (
		<div className="admin-main-wrapper">
			{/* Acá vas a importar el <Header /> más adelante */}

			<div className="admin-main-content">
				<h1 className="admin-main-title">Bienvenido al Panel de Administración</h1>

				<div className="admin-main-buttons">
					<button onClick={() => navigate(ADMINALUMNOS)}>Alumnos</button>
					<button onClick={() => navigate(ADMINCURSOS)}>Cursos</button>
					<button onClick={() => navigate(ADMINDOCENTES)}>Docentes</button>
				</div>
			</div>

			{/* Acá vas a importar el <Footer /> más adelante */}
		</div>
	);
};

export default AdminMain;
