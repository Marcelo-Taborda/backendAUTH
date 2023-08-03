// auth/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
}, 
{
    origin: 'http://localhost:7000',
    optionsSuccessStatus: 200,
    credentials: true
},           
{
    origin: 'https://frontenddd-production.up.railway.app/',
    optionsSuccessStatus: 200,
    credentials: true
},          
{
    origin: 'backendapi-production-f363.up.railway.app',
    optionsSuccessStatus: 200,
    credentials: true
},
             
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Puerto de escucha
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
