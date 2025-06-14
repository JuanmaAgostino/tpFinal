import React from 'react'
import LoginUsuarios from '../component/usuarios/LoginUsuarios'
import LoginHeader from '../component/login/LoginHeader'
import Footer from '../component/componentGenerales/Footer'

const LoginPage = () => {
  return (
    <>
    <LoginHeader/>
    <LoginUsuarios/>
    <Footer/>
    </>
  )
}

export default LoginPage