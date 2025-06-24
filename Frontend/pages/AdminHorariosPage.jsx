import Header from "../component/componentGenerales/Header";
import Footer from "../component/componentGenerales/Footer";
import AdminHorarioCrud from "../component/admin/AdminHorarioCrud";

export default function AdminHorariosPage() {
  return (
    <>
      <Header />
      <AdminHorarioCrud />
      <Footer />
    </>
  );
}