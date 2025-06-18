import AdminAlumnosCrud from "./AdminAlumnosCrud";
import AdminDocentesCrud from "./AdminDocentesCrud";
import AdminCursoCrud from "./AdminCursoCrud";

export default function AdminMain() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <AdminAlumnosCrud />
      <AdminDocentesCrud />
      <AdminCursoCrud />
    </div>
  );
}