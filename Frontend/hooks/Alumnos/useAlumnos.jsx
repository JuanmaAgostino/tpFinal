import axios from "axios";
import { alumnosEndpoint, localhost } from "../../routes/rutas";
import { useState, useEffect } from "react";

const API_URL = `${localhost}${alumnosEndpoint}`;
console.log(API_URL);
export function useAlumnos() {
    const [alumnos, setAlumnos] = useState([]);
    const [alumnoActual, setAlumnoActual] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //mostrar todos
    const fetchAlumnos = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}`);
            if (Array.isArray(res.data)) {
                setAlumnos(res.data);
            } else {
                setAlumnos([]);
                setError("Respuesta inesperada del servidor");
            }
        } catch (err) {
            setError("Error al obtener alumnos");
        } finally {
            setLoading(false);
        }
    };

    // mostrar por id
    const buscarAlumnoPorId = async (id) => {
        try {
            const res = await axios.post(`${API_URL}/${id}`);
            
            //console.log("Resultado buscarAlumnoPorId:", res.data);

            setAlumnoActual(res.data[0]);
            
        } catch (err) {
            setError("Alumno no encontrado");
        }
    };

    //agregar alumno nuevo
    const crearAlumno = async (nuevoAlumno) => {
        try {
            await axios.post(API_URL, nuevoAlumno);
            console.log(nuevoAlumno.nombre);
            fetchAlumnos();
        } catch (err) {
            setError("Error al crear alumno");
        }
    };

    //edito al alumno
    const editarAlumno = async (id, alumnoEditado) => {
        
        try {
            await axios.put(`${API_URL}/${id}`, alumnoEditado);
            fetchAlumnos();
        } catch (err) {
            setError("Error al editar alumno");
        }
    };

    //elimino al alumno
    const eliminarAlumno = async (id) => {  
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchAlumnos();
        } catch (err) {
            setError("Error al eliminar alumno");
        }
    };

    useEffect(() => {
        fetchAlumnos();
    }, []);

    return {
        alumnos,
        alumnoActual,
        error,
        loading,
        fetchAlumnos,
        buscarAlumnoPorId,
        crearAlumno,
        editarAlumno,
        eliminarAlumno,
    };
}