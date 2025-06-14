import axios from "axios";
import { cursosEndpoint, localhost, horarioCursoEndpoint, docentesEndpoint, cursoInfoEndpoint } from "../../routes/rutas";
import { useState, useEffect } from "react";

const API_URL = `${localhost}${cursosEndpoint}`;

export function useCursos() {
    const [cursos, setCursos] = useState([]);
    const [cursoDocente, setCursoDocente] = useState(null);
    const [cursoActual, setCursoActual] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cursoInfo, setCursoInfo] = useState([]);
    const [cursosAlumno, setCursosAlumno] = useState([]); // 👈 ESTADO BIEN NOMBRADO

    // Mostrar todos los cursos
    const fetchCursos = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}`);
            if (Array.isArray(res.data)) {
                setCursos(res.data);
            } else {
                setCursos([]);
                setError("Respuesta inesperada del servidor");
            }
        } catch (err) {
            setError("Error al obtener cursos");
        } finally {
            setLoading(false);
        }
    };

    // Mostrar info detallada de cursos
    const CursoInfo = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${localhost}${cursoInfoEndpoint}`);
            if (Array.isArray(res.data)) {
                setCursoInfo(res.data);
            } else {
                setCursoInfo([]);
                setError("Respuesta inesperada del servidor");
            }
        } catch (err) {
            setError("Error al obtener curso info");
        } finally {
            setLoading(false);
        }
    };

    // Mostrar cursos de un alumno
    const getCursosAlumno = async (idAlumno) => {
        setLoading(true);
        try {
            const res = await axios.get(`${localhost}/cursos/alumno/${idAlumno}`);
            setCursosAlumno(res.data);
        } catch (err) {
            setError("Error al obtener cursos del alumno");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Inscribir alumno en curso
    const inscribirEnCursoInfo = async (idUsuario, idCursoInfo) => {
        try {
            await axios.post(`${localhost}${cursoInfoEndpoint}/inscribir`, {
                idUsuario,
                idCursoInfo,
                idPago: null
            });
            alert("Inscripción realizada correctamente");
        } catch (err) {
            console.error(err);
            setError("No se pudo inscribir al curso");
        }
    };

    //HACER CRUD CURSOS!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!

    useEffect(() => {
        fetchCursos();
    }, []);

    return {
        cursos,
        cursoInfo,
        cursoDocente,
        cursoActual,
        cursosAlumno,
        error,
        loading,
        fetchCursos,
        CursoInfo,
        getCursosAlumno,
        inscribirEnCursoInfo,
       
    };
}

