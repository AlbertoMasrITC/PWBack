const express = require('express');

// Inicializarlo
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);

// Base de datos
require('./config/conexiones');

// Ruta
app.get('/', (req, res) => {

    res.json({ mensaje: "Hola!"});

})

// Levantar el servidor
app.listen(app.get('port'), (error) => {

    if(error) {
        console.log("Ha ocurrido un error al levantar el servidor", error);
    } else {
        console.log("Servidor en puerto: ", app.get('port'));
    }

})