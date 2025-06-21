import React from 'react'
import LoginUsuarios from '../component/usuarios/LoginUsuarios'
import LoginHeader from '../component/login/LoginHeader'

import LoginFooter from '../component/login/LoginFooter'

const LoginPage = () => {
  return (
    <>
    <LoginHeader/>
    <LoginUsuarios/>
    <LoginFooter/>
    </>
  )

}

export default LoginPage