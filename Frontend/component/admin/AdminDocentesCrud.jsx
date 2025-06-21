import { useState } from 'react';
import { useAdminDocentes } from '../../hooks/admin/useAdminDocentes';
import '../../styles/AdminDocentesCrud.css';

export default function AdminDocentesCrud() {
	const { docentes, loading, error, crearDocente, editarDocente, eliminarDocente } =
		useAdminDocentes();
	const [form, setForm] = useState({ nombre: '', apellido: '', idUsuario: '' });
	const [editando, setEditando] = useState(null);

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editando) {
			editarDocente(editando, form);
			setEditando(null);
		} else {
			crearDocente(form);
		}
		setForm({ nombre: '', apellido: '', idUsuario: '' });
	};

	return (
		<div className="admin-docentes-container">
			<h2>Administración de Docentes</h2>

			{loading && <p>Cargando...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			{docentes.map((d) => (
				<div className="docente-item" key={d.idDocente}>
					<span>
						{d.nombre} {d.apellido} - ID Usuario: {d.idUsuario}
					</span>
					<div>
						<button
							className="btn btn-danger btn-sm"
							onClick={() => eliminarDocente(d.idDocente)}
						>
							Eliminar
						</button>
						<button
							className="btn btn-warning btn-sm"
							onClick={() => {
								setForm({
									nombre: d.nombre,
									apellido: d.apellido,
									idUsuario: d.idUsuario,
								});
								setEditando(d.idDocente);
							}}
						>
							Editar
						</button>
					</div>
				</div>
			))}

			<form onSubmit={handleSubmit}>
				<input
					name="nombre"
					placeholder="Nombre"
					value={form.nombre}
					onChange={handleChange}
				/>
				<input
					name="apellido"
					placeholder="Apellido"
					value={form.apellido}
					onChange={handleChange}
				/>
				<input
					name="idUsuario"
					placeholder="ID Usuario"
					value={form.idUsuario}
					onChange={handleChange}
				/>
				<button type="submit">{editando ? 'Guardar' : 'Crear'}</button>
			</form>
		</div>
	);
}
