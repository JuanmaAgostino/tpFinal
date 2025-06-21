import React from 'react'
import AdminAlumnosCrud from '../component/admin/AdminAlumnosCrud'
import Header from '../component/componentGenerales/Header'
import Footer from '../component/componentGenerales/Footer'
const AdminAlumnos = () => {
  return (
    <div>
         <Header/>
        <AdminAlumnosCrud />
        <Footer/>
    </div>
  )
}

export default AdminAlumnos; // ✅ Esto soluciona el error