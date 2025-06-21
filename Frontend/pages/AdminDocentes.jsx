import React from 'react'
import AdminDocentesCrud from '../component/admin/AdminDocentesCrud'
import Header from '../component/componentGenerales/Header' 
import Footer from '../component/componentGenerales/Footer'


const AdminDocentes = () => {
  return (
    <div>
      <Header />
      <AdminDocentesCrud />
      <Footer />
    </div>
  )
}

export default AdminDocentes