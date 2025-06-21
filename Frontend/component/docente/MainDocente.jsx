import React, { useEffect, useState } from 'react';
import { useDocentes } from '../../hooks/docentes/useDocentes';
import { useUserStore } from '../../context/guardarIdYRol';
import axios from 'axios';
import { localhost } from '../../routes/rutas';
import '../../styles/DocentePage.css';

export default function MainDocente() {
	const idDocente = useUserStore.getState().id;
	const [cursos, setCursos] = useState([]);
	const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

	const {
		asistencias,
		loading,
		error,
		success,
		fetchAsistencias,
		actualizarAsistencia,
	} = useDocentes();

	// Traer cursos cuando carga
	useEffect(() => {
		const fetchCursos = async () => {
			try {
				const res = await axios.post(`${localhost}/docente_curso/listarCursos`, {
					idDocente,
				});
				setCursos(res.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchCursos();
	}, [idDocente]);

	// Traer asistencias al elegir curso
	useEffect(() => {
		if (cursoSeleccionado) {
			fetchAsistencias(idDocente, cursoSeleccionado);
		}
	}, [cursoSeleccionado]);

	return (
		<div className="docente-container">
			<h2>Asistencias del Docente</h2>

			<label>Selecciona un curso: </label>
			<select
				value={cursoSeleccionado || ''}
				onChange={(e) => setCursoSeleccionado(e.target.value)}
			>
				<option value="">-- Selecciona --</option>
				{cursos.map((curso) => (
					<option key={curso.idCursoInfo} value={curso.idCursoInfo}>
						{curso.nombreCurso}
					</option>
				))}
			</select>

			{loading && <p>Cargando...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>Actualización exitosa</p>}

			{asistencias.length === 0 && cursoSeleccionado ? (
				<p>No hay asistencias para este curso.</p>
			) : (
				<table border="1" cellPadding="8" cellSpacing="0">
					<thead>
						<tr>
							<th>Legajo</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>Curso</th>
							<th>Estado</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{asistencias.map((a) => (
							<tr key={a.idAsistencia}>
								<td>{a.Legajo}</td>
								<td>{a.nombre}</td>
								<td>{a.apellido}</td>
								<td>{a.nombreCurso}</td>
								<td>{a.estado}</td>
								<td>
									<button
										onClick={async () => {
											await actualizarAsistencia(a.idAsistencia, 'Presente');
											fetchAsistencias(idDocente, cursoSeleccionado);
										}}
									>
										Presente
									</button>
									<button
										onClick={async () => {
											await actualizarAsistencia(a.idAsistencia, 'Libre');
											fetchAsistencias(idDocente, cursoSeleccionado);
										}}
										style={{ marginLeft: '10px' }}
									>
										Libre
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
