import React from 'react'
import AdminCursoCrud from '../component/admin/AdminCursoCrud'
import Header from '../component/componentGenerales/Header'
import Footer from '../component/componentGenerales/Footer' 


const AdminCursos = () => {
  return (
    <div>
      <Header />
      <AdminCursoCrud />
      <Footer />
    </div>
  )
}

export default AdminCursos