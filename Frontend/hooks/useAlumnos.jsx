import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerAlumnos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3001/alumnos');
        setAlumnos(respuesta.data);
      } catch (error) {
        console.error('Error al obtener alumnos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerAlumnos();
  }, []);

  return { alumnos, cargando };
};
