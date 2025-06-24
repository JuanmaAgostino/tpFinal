import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMINALUMNOS, ADMINCURSOS, ADMINDOCENTES, ADMINHORARIOS, ADMINSECRETARIOS, ADMINTESOREROS } from '../../routes/rutas';
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
					<button onClick={() => navigate(ADMINHORARIOS)}>Horarios</button>
					<button onClick={() => navigate(ADMINSECRETARIOS)}>Secretarios</button>
					<button onClick={() => navigate(ADMINTESOREROS)}>Tesoreros</button>
				</div>
			</div>

			{/* Acá vas a importar el <Footer /> más adelante */}
		</div>
	);
};

export default AdminMain;
