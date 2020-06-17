// Dependencias API
const express = require('express');

//Dependecia para interpretar mensajes JSON
const bodyParser = require('body-parser');

//Dependencia para el manejo de DB
const mongoose = require('mongoose');

//Dependecia y definiciones de Rutas
const routerV1 = require('./routes/v1/index');

//Depedencias del Middleware
const morgan = require('morgan');

//Depedencias de Configuración
const dotenv = require('dotenv');

// Indico que la aplicacion es de tipo Express
const app = express();

// Indico que voy requerir la configuracion de mis variables de entorno
dotenv.config();

//Middlware -> Funciones que se ejcutan antes de ir al servidor
app.use(morgan('dev'));
//--> parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Rutas de la aplicación
routerV1(app);

//Conexion con DB

//---> se recupera en donde va a correr la DB
const db = process.env.MONGO || 'mongodb://localhost/my_database';

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('DB Conected');
  })
  .catch(error => {
    console.log('DB con errores', error);
  });

//Inicio del Servidor
//---> se recupera el puerto en donde va a correr la aplicacion, si no existe 3000
const port = process.env.PORT || 3000;

app.listen(port,() => {
  console.log('Servidor escuchando en el puerto', port);
});
