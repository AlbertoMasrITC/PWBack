const mySQL = require('mysql');

const conexion = {
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "123456",
    "database": "SistemaTicket"
}

// Crear conexión
const miConeccion = mySQL.createConnection(conexion);

// Conectar
miConeccion.connect((error) => {

    if(error) {
        console.log("Error al conectar a la base de datos: ", error);
    } else {
        console.log("Conectado a la base de datos");
    }

});

module.exports = miConeccion;