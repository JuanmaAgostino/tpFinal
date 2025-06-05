import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlumnosPage from '../pages/AlumnosPage'
import {ALUMNOSPAGE} from '../routes/rutas'

function App() {
  
  return (
    <>
      <div>

        <BrowserRouter>
          <Routes>
            <Route path={ALUMNOSPAGE} element={<AlumnosPage />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
