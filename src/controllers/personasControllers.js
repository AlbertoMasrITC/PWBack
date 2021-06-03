const connection = require('../config/conexiones');

function listar(req, res) {

    if(connection) {

        let query = "SELECT * FROM Personal";
        connection.query(query, (err, personas) => {

            if(err) {

                res.json(err);

            } else {

                console.log(personas);
                res.json({personas});

            }

        });

    }

}

function obtenerPersonal(req, res) {

    if(connection) {

        const { id } = req.params;
        let query = `SELECT * FROM Personal WHERE ID = ${connection.escape(id)}`;

        connection.query(query, (err, personal) => {

            if(err) {

                console.log(err);

            } else {

                var mensaje = "";
                
                if(personal === undefined || personal.length == 0)
                    mensaje = "Persona no encontrada";

                res.json({data: personal, mensaje});

            }

        });

    }

}

function agregarPersonal(req, res) {

    if(connection) {

        console.log(req.body);
        const personal = req.body;

        if(!personal.Nombre && !personal.Apellido) {

            return res.status(400).send({error: true, mensaje: "El nombre y apellido es obligatorio"});            

        }

        if(personal.Telefono && personal.Telefono.length !== 10) {

            return res.status(400).send({error: true, mensaje: "La longitud debe ser de 10 caracteres"});            

        }

        let query = `INSERT INTO Personal(Nombre, Apellido, Telefono, Direccion) VALUES(${personal.Nombre}, ${personal.Apellido}, ${personal.Telefono}, ${personal.Direccion});`;

        connection.query(query, (err, data) => {

            if(err) {

                console.log(err);

            } else {

                res.json({data, mensaje: "Categoria creada con exito"});

            }

        });

    }

}

function editarPersonal(req, res) {

    if(connection) {

        const id = req.params.id;
        const personal = req.body;

        let query = "UPDATE Personal set ? WHERE ID = ?";

        connection.query(query, [personal, id], (error, data) => {

            if(err) {

                res.json(err);

            } else {

                let mensaje = "";

                if(data.changedRows === 0) {

                    mensaje = "La informacion es la misma";

                }

                res.json({error: false, data, mensaje});

            }

        });

    }

}

function eliminarPersonal(req, res) {

    if(connection) {

        const { id } = req.params;

        let query = "DELETE FROM Personal WHERE ID = ?";

        connection.query(query, [id], (err, data) => {

            if(err) {

                res.json(err);

            } else {

                let mensaje = "";

                if(data.affectedRows === 0) {

                    mensaje = "Persona no encontrada";

                } else {


                    mensaje = "Persona eliminada con exito";

                }

                res.json({error: false, data});

            }

        });

    }

}

module.exports = {

    listar,
    obtenerPersonal,
    agregarPersonal,
    editarPersonal,
    eliminarPersonal

}