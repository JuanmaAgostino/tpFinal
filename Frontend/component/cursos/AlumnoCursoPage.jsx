import React, { useEffect } from 'react';
import { useCursos } from '../../hooks/cursos/useCursos';
import { useUserStore } from '../../context/guardarIdYRol';
import '../../styles/AlumnoCurso.css'; // Importa tus estilos CSS

export default function CursoPage() {
	const {
		cursoInfo,
		error,
		loading,
		CursoInfo,
		inscribirEnCursoInfo,
		cursosAlumno,
		getCursosAlumno,
	} = useCursos();

	const { id } = useUserStore();
	const idUsuario = id;

	useEffect(() => {
		CursoInfo();
		if (idUsuario) {
			getCursosAlumno(idUsuario);
		}
	}, [idUsuario]);

	return (
		<main className="main-alumno">
			<div className="main-container">
				<div>
					<h2 className="title">Cursos en los que estás inscripto</h2>
					{cursosAlumno.length === 0 ? (
						<p className="info">No estás inscripto en ningún curso.</p>
					) : (
						<ul className="alumno-list">
							{cursosAlumno.map((curso, index) => (
								<li key={index} className="alumno-item">
									<div>
										<strong>{curso.nombreCurso}</strong> - {curso.Titulo}
										<br />
										Desde: {new Date(
											curso.FechaInicio
										).toLocaleDateString()} Hasta:{' '}
										{new Date(curso.FechaFin).toLocaleDateString()}
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				<div>
					<h2 className="section-title">Información de Cursos</h2>
					{loading && <p className="info">Cargando...</p>}
					{error && <p className="error">Error: {error}</p>}
					<ul className="alumno-list">
						{cursoInfo.map((info, index) => (
							<li key={`${info.idCursoInfo}-${index}`} className="alumno-item">
								<div>
									<strong>{info.NombreCurso}</strong>
									<br />
									Materias: {info.Materias}
									<br />
									Título: {info.Titulo}
									<br />
									Proyecto final: {info.Proyecto === 1 ? 'Sí tiene' : 'No tiene'}
									<br />
									Fecha de inicio: {new Date(info.FechaInicio).toLocaleDateString()}
									<br />
									Fecha de fin: {new Date(info.FechaFin).toLocaleDateString()}
									<br />
									Hora de clase: {info.HoraClase}
								</div>

								<div className="button-group">
									<button
										className="btn crear"
										onClick={() => {
											console.log('Voy a inscribir:', {
												idUsuario,
												idCursoInfo: info.idCursoInfo,
											});
											if (idUsuario) {
												inscribirEnCursoInfo(idUsuario, info.idCursoInfo);
											} else {
												alert('No se encontró usuario logueado');
											}
										}}
									>
										Inscribirse
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
