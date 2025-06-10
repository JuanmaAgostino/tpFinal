import React from 'react'
import Header from '../component/componentGenerales/Header'
import Footer from '../component/componentGenerales/Footer'
import MainAlumnos from '../component/alumno/MainAlumnos'


//compilo los componentes de las páginas
const AlumnoPage = () => {
  return (
    <>
    <Header/>
    <MainAlumnos/>
    <Footer/>
    </>
  )
}

export default AlumnoPage