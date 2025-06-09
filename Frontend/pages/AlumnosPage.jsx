import React from 'react'
import HeaderAlumnos from '../component/alumno/HeaderAlumnos'
import FooterAlumnos from '../component/alumno/FooterAlumnos'
import MainAlumnos from '../component/alumno/MainAlumnos'


//compilo los componentes de las páginas
const AlumnoPage = () => {
  return (
    <>
    <HeaderAlumnos/>
    <MainAlumnos/>
    <FooterAlumnos/>
    </>
  )
}

export default AlumnoPage