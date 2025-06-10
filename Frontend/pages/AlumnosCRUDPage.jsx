import React from 'react'
import Header from '../component/componentGenerales/Header'
import Footer from '../component/componentGenerales/Footer'
import AlumnosCrudMain from '../component/alumno/AlumnosCrudMain'


//compilo los componentes de las páginas
const AlumnoPage = () => {
  return (
    <>
    <Header/>
    <AlumnosCrudMain/>
    <Footer/>
    </>
  )
}

export default AlumnoPage