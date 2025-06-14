import axios from "axios";
import { cursosEndpoint, localhost, horarioCursoEndpoint, docentesEndpoint } from "../../routes/rutas";
import { useState, useEffect } from "react";

const API_URL = `${localhost}${cursosEndpoint}`;
console.log(API_URL);
export function useCursos() {
    const [cursos, setCursos] = useState([]);
    const [cursoDocente, setCursoDocente] = useState(null);
    const [cursoActual, setCursoActual] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //mostrar todos
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

    // mostrar por id
    const buscarCursoPorId = async (id) => {
        try {
            const res = await axios.post(`${API_URL}/${id}`);

            //console.log("Resultado buscarCursoPorId:", res.data);

            setCursoActual(res.data[0]);

        } catch (err) {
            setError("Curso no encontrado");
        }
    };

    //agregar curso nuevo
    const crearCurso = async (nuevoCurso) => {

        try {

            await axios.post(API_URL, nuevoCurso);

            fetchCursos();
        } catch (err) {
            setError("Error al crear curso");
        }
    };

    //edito al curso
    const editarCurso = async (id, cursoEditado) => {

        try {
            await axios.put(`${API_URL}/${id}`, cursoEditado);
            fetchCursos();
        } catch (err) {
            setError("Error al editar alumno");
        }
    };


   // Inscribir alumno en curso
    const inscribirseEnCurso = async (alumnoId, cursoId) => {
        try {
            // Ajusta la URL según tu backend
            await axios.post(`${API_URL}/${cursoId}/inscribir`, { alumnoId });
            // Opcional: recargar cursos o mostrar mensaje de éxito
            fetchCursos();
        } catch (err) {
            setError("No se pudo inscribir al curso");
        }
    };

    //elimino al curso
    const eliminarCurso = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCursos();
        } catch (err) {
            setError("Error al eliminar curso");
        }
    };

    // Informacion de docentes que dan el curso
    const obtenerDocentesPorCurso = async () => {
        try {
            console.log(`${API_URL}`)
            const res = await axios.get(`${API_URL}${horarioCursoEndpoint}${docentesEndpoint}`);
            setCursoDocente(res.data[0]);
        } catch (err) {
            setError("Error al obtener docentes del curso");
            return [];
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return {
        cursos,
        cursoDocente,
        cursoActual,
        error,
        loading,
        fetchCursos,
        buscarCursoPorId,
        crearCurso,
        editarCurso,
        eliminarCurso,
        inscribirseEnCurso,
        obtenerDocentesPorCurso
    };
}