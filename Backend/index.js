const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;
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
app.use(cors());
app.use(express.json());

//todas las rutas de las peticiones al servidor
//alumnos
app.use("/",alumnosCursosRoutes);
app.use("/",alumnosRoutes);
//cursos
app.use("/",cursoRoutes);
app.use("/",cursoinfoRoutes);
app.use("/",horarioCursoRoutes);
app.use("/",horarioRoutes);

//usuarios
app.use("/",usuariosRoutes);

//docente
app.use("/",docenteRoutes);
//inscripcion
app.use("/",inscripcionRoutes);
app.use("/",docenteCursoRoutes);
//pago
app.use("/",pagoRoutes);





app.use("/",asistenciaRoutes);


// Conexión a la base de datos
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', 
  database: 'tpfinal'
});

//Mensaje por si falla la conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

//muestro un mensaje que el servidor esta funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

//hago un console.log para ver en que puerto esta corriendo el backend (para tener a mano la ruta)
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
