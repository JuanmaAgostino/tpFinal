import Header from "../component/componentGenerales/Header";
import Footer from "../component/componentGenerales/Footer";
import AdminSecretariosCrud from "../component/admin/AdminSecretariosCrud";

export default function AdminSecretariosPage() {
  return (
    <>
      <Header />
      <AdminSecretariosCrud />
      <Footer />
    </>
  );
}