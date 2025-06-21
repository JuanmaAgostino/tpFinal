import { useState } from 'react';
import { useAdminCursos } from '../../hooks/admin/useAdminCursos';
import '../../styles/AdminCursoCrud.css';

export default function AdminCursoCrud() {
	const { cursos, loading, error, crearCurso, editarCurso, eliminarCurso } =
		useAdminCursos();
	const [form, setForm] = useState({
		Nombre: '',
		Materias: '',
		Titulo: '',
		Proyecto: '',
		Precio: '',
	});
	const [editando, setEditando] = useState(null);

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editando) {
			editarCurso(editando, form);
			setEditando(null);
		} else {
			crearCurso(form);
		}
		setForm({ Nombre: '', Materias: '', Titulo: '', Proyecto: '', Precio: '' });
	};

	return (
		<div className="admin-curso-container">
			<h2>Administración de Cursos</h2>

			{loading && <p>Cargando...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			{cursos.map((c) => (
				<div className="curso-item" key={c.idCurso}>
					<span>
						<strong>Nombre:</strong> {c.Nombre}
					</span>
					<span>
						<strong>Materias:</strong> {c.Materias}
					</span>
					<span>
						<strong>Título:</strong> {c.Titulo}
					</span>
					<span>
						<strong>Proyecto:</strong> {c.Proyecto}
					</span>
					<span>
						<strong>Precio:</strong> ${c.Precio}
					</span>
					<div>
						<button onClick={() => eliminarCurso(c.idCurso)}>Eliminar</button>
						<button
							onClick={() => {
								setForm({
									Nombre: c.Nombre,
									Materias: c.Materias,
									Titulo: c.Titulo,
									Proyecto: c.Proyecto,
									Precio: c.Precio,
								});
								setEditando(c.idCurso);
							}}
						>
							Editar
						</button>
					</div>
				</div>
			))}

			<form onSubmit={handleSubmit}>
				<input
					name="Nombre"
					placeholder="Nombre"
					value={form.Nombre}
					onChange={handleChange}
				/>
				<input
					name="Materias"
					placeholder="Materias"
					value={form.Materias}
					onChange={handleChange}
				/>
				<input
					name="Titulo"
					placeholder="Título"
					value={form.Titulo}
					onChange={handleChange}
				/>
				<input
					name="Proyecto"
					placeholder="Proyecto"
					value={form.Proyecto}
					onChange={handleChange}
				/>
				<input
					name="Precio"
					placeholder="Precio"
					value={form.Precio}
					onChange={handleChange}
				/>
				<button type="submit">{editando ? 'Guardar' : 'Crear'}</button>
			</form>
		</div>
	);
}
