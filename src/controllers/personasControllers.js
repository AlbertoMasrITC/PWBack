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

                res.json({data: personal[0], mensaje});

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

        if(personal.Nombre.length > 50) {

            return res.status(400).send({error: true, mensaje: "El nombre debe contener a lo mucho 50 caracteres"});            


        }

        if(personal.Apellido.length > 80) {

            return res.status(400).send({error: true, mensaje: "El Apellido debe contener a lo mucho 80 caracteres"});            

        }

        if(personal.Telefono && personal.Telefono.length !== 10) {

            return res.status(400).send({error: true, mensaje: "La longitud debe ser de 10 caracteres"});            

        }

        let query = "INSERT INTO Personal set ?";

        connection.query(query, [personal], (err, data) => {

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

        const {id} = req.params;
        const personal = req.body;

        if(personal.Nombre.length > 50) {

            return res.status(400).send({error: true, mensaje: "El nombre debe contener a lo mucho 50 caracteres"});            


        }

        if(personal.Apellido.length > 80) {

            return res.status(400).send({error: true, mensaje: "El Apellido debe contener a lo mucho 80 caracteres"});            

        }

        if(personal.Telefono && personal.Telefono.length !== 10) {

            return res.status(400).send({error: true, mensaje: "La longitud debe ser de 10 caracteres"});            

        }

        let query = "UPDATE Personal set ? WHERE ID = ?";

        connection.query(query, [personal, id], (err, data) => {

            if(err) {

                res.json(err);

            } else {

                let mensaje = "";

                if(data.changedRows === 0) {

                    mensaje = "La informacion es la misma";

                } else {
                    mensaje = "Persona actualizada con exito"
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

                res.json({error: false, data, mensaje});

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