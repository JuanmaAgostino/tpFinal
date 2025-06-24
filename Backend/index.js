const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;
const tesoreroRoutes = require('./routes/tesoreroRoute');
const cursoRoutes = require('./routes/cursoRoutes');
const alumnosRoutes = require('./routes/alumnosRoutes');
const alumnosCursosRoutes = require('./routes/cursoAlumnosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const horarioCursoRoutes = require('./routes/horarioCursoRoutes');
const cursoinfoRoutes = require('./routes/cursoInfoRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const docenteCursoRoutes = require('./routes/docenteCursoRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(cors());
app.use(express.json());
app.use('/', tesoreroRoutes);

//todas las rutas de las peticiones al servidor

//admin
app.use('/admin', adminRoutes); 
//alumnos
app.use("/", alumnosCursosRoutes);
app.use("/", alumnosRoutes);
//cursos
app.use("/", cursoRoutes);
app.use("/", cursoinfoRoutes);
app.use("/", horarioCursoRoutes);
app.use("/", horarioRoutes);

//usuarios
app.use("/usuarios", usuariosRoutes);
//docente
app.use("/", docenteRoutes);

//docente_curso
app.use("/docente_curso", docenteCursoRoutes);

//inscripcion
app.use("/", inscripcionRoutes);
app.use("/", docenteCursoRoutes);
//pago
app.use("/", pagoRoutes);
//asistencia
app.use("/", asistenciaRoutes);

//horario
app.use("/", horarioRoutes);

//muestro un mensaje que el servidor esta funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

//hago un console.log para ver en que puerto esta corriendo el backend (para tener a mano la ruta)
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
