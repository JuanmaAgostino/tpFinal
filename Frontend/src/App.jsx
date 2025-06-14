import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//importo las páginas
import AdminMainPage from '../pages/AdminMainPage';
import AlumnosCRUDPage from '../pages/AlumnosCRUDPage';
import LoginPage from "../pages/LoginPage";
import AlumnosMainPage from "../pages/AlumnosMainPage";
import DocenteMainPage from "../pages/DocenteMainPage";
//importo las rutas
import { ALUMNOSPAGE, LOGINPAGE, CRUDALUMNOS, DOCENTESPAGE, ADMINPAGE, TESOREROPAGE } from '../routes/rutas';
import TesoreroPage from "../pages/TesoreroPage.jsx";

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App