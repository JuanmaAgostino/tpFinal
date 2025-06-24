import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//importo las páginas
import AdminAlumnos from '../pages/AdminAlumnos';
import AdminCursos from '../pages/AdminCursos';
import AdminDocentes from '../pages/AdminDocentes';
import AdminMainPage from '../pages/AdminMainPgue';
import AlumnosCRUDPage from '../pages/AlumnosCRUDPage';
import LoginPage from "../pages/LoginPage";
import AlumnosMainPage from "../pages/AlumnosMainPage";
import DocenteMainPage from "../pages/DocenteMainPage";
import SecretarioCrudPage from "../pages/SecretarioCrudPage.jsx";

import AdminHorariosPage from "../pages/AdminHorariosPage";
import AdminSecretariosPage from "../pages/AdminSecretariosPage.jsx";
import AdminTesorerosPage from "../pages/AdminTesorerosPage.jsx";

//importo las rutas
import { ALUMNOSPAGE, LOGINPAGE, CRUDALUMNOS, DOCENTESPAGE, ADMINPAGE, TESOREROPAGE, SECRETARIOCRUDPAGE, ADMINALUMNOS, ADMINCURSOS, ADMINDOCENTES, ADMINMAINPAGE} from '../routes/rutas';
import TesoreroPage from "../pages/TesoreroPage.jsx";

import { ADMINHORARIOS, ADMINSECRETARIOS, ADMINTESOREROS } from "../routes/rutas";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={CRUDALUMNOS} element={<AlumnosCRUDPage />} />
          <Route path={DOCENTESPAGE} element={<DocenteMainPage />} />
          <Route path={LOGINPAGE} element={<LoginPage />} />
          <Route path={ALUMNOSPAGE} element={<AlumnosMainPage />} />
          <Route path={ADMINPAGE} element={<AdminMainPage />} />
          <Route path={TESOREROPAGE} element={<TesoreroPage />} />
          <Route path={SECRETARIOCRUDPAGE} element={<SecretarioCrudPage />} />
          <Route path={ADMINALUMNOS} element={<AdminAlumnos />} />
          <Route path={ADMINCURSOS} element={<AdminCursos />} />
          <Route path={ADMINDOCENTES} element={<AdminDocentes />} />  
          <Route path={ADMINMAINPAGE} element={<AdminMainPage />} />
          <Route path={ADMINHORARIOS} element={<AdminHorariosPage />} />
          <Route path={ADMINSECRETARIOS} element={<AdminSecretariosPage />} />
          <Route path={ADMINTESOREROS} element={<AdminTesorerosPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App