const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;
const alumnosRoutes = require('./routes/alumnos');
app.use(cors());
app.use(express.json());

app.use("/",alumnosRoutes)

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


app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

//hago un console.log para ver en que puerto esta corriendo el backend (para tener a mano la ruta)
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
