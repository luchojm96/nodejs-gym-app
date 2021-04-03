const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// middlewares
app.use(cors());
app.use(express.json());

// Rutas
// Auth: SignUp, SignIn, renewToken
app.use('/api/auth', require('./routes/auth.routes'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
