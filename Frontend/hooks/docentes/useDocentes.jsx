import { useState } from "react";
import axios from "axios";
import { localhost } from "../../routes/rutas";

const API_URL = `${localhost}/docente_curso`;

export function useDocentes() {
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // 🔑 Traer asistencias
    const fetchAsistencias = async (idDocente, idCursoInfo) => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(`${API_URL}/listarAsistencias`, {
                idDocente,
                idCursoInfo,
            });
            setAsistencias(res.data);
        } catch (err) {
            console.error(err);
            setError("Error al obtener asistencias");
        } finally {
            setLoading(false);
        }
    };

    // 🔑 Actualizar asistencia
    const actualizarAsistencia = async (idAsistencia, nuevoEstado) => {
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            await axios.put(`${API_URL}/actualizarAsistencia`, {
                idAsistencia,
                estado: nuevoEstado,
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError("Error al actualizar asistencia");
        } finally {
            setLoading(false);
        }
    };

    return {
        asistencias,
        loading,
        error,
        success,
        fetchAsistencias,
        actualizarAsistencia,
    };
}
