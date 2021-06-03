const express = require('express');
const cors = require('cors');

// Inicializarlo
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(express.urlencoded({extended: false})); // Por si los datos del body viene en cierto formato
app.use(express.json()); // Por si hay muchos tipos de formatos en el JSON
app.use(cors());

// Base de datos
require('./config/conexiones');

// Rutas
app.use(require('./routes/categoriasRoutes'));
app.use(require('./routes/personasRoutes'));

// Levantar el servidor
app.listen(app.get('port'), (error) => {

    if(error) {
        console.log("Ha ocurrido un error al levantar el servidor", error);
    } else {
        console.log("Servidor en puerto: ", app.get('port'));
    }

})