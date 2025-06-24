import Header from "../component/componentGenerales/Header";
import Footer from "../component/componentGenerales/Footer";
import AdminTesorerosCrud from "../component/admin/AdminTesorerosCrud";

export default function AdminTesorerosPage() {
  return (
    <>
      <Header />
      <AdminTesorerosCrud />
      <Footer />
    </>
  );
}