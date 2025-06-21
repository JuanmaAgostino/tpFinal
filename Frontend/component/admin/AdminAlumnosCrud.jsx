import { useState } from 'react';
import { useAdminAlumnos } from '../../hooks/admin/useAdminAlumnos';
import '../../styles/AdminAlumnosCrud.css';

export default function AdminAlumnosCrud() {
	const { alumnos, loading, error, crearAlumno, editarAlumno, eliminarAlumno } =
		useAdminAlumnos();
	const [form, setForm] = useState({ nombre: '', apellido: '', email: '' });
	const [editando, setEditando] = useState(null);

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editando) {
			editarAlumno(editando, form);
			setEditando(null);
		} else {
			crearAlumno(form);
		}
		setForm({ nombre: '', apellido: '', email: '' });
	};

	return (
		<div className="admin-alumnos-container">
			<h2>Administración de Alumnos</h2>

			{loading && <p>Cargando...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			{alumnos.map((a) => (
				<div className="alumno-item" key={a.idAlumno}>
					<span>
						<strong>Nombre:</strong> {a.nombre}
					</span>
					<span>
						<strong>Apellido:</strong> {a.apellido}
					</span>
					<span>
						<strong>Email:</strong> {a.email}
					</span>
					<div>
						<button onClick={() => eliminarAlumno(a.idAlumno)}>Eliminar</button>
						<button
							onClick={() => {
								setForm({
									nombre: a.nombre,
									apellido: a.apellido,
									email: a.email,
								});
								setEditando(a.idAlumno);
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
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
				/>
				<button type="submit">{editando ? 'Guardar' : 'Crear'}</button>
			</form>
		</div>
	);
}
