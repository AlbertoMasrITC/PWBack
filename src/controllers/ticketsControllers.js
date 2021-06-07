const connection = require('../config/conexiones');

function listar(req, res) {

    if(connection) {

        let query = "SELECT * FROM Tickets";
        connection.query(query, (err, tickets) => {

            if(err) {

                res.json(err);

            } else {

                console.log(tickets);
                res.json({tickets});

            }

        });

    }

}

function obtenerTicket(req, res) {

    if(connection) {

        const { id } = req.params;
        let query = `SELECT * FROM Tickets WHERE ID = ${connection.escape(id)}`;

        connection.query(query, (err, tickets) => {

            if(err) {

                console.log(err);

            } else {

                var mensaje = "";
                
                if(tickets === undefined || tickets.length == 0)
                    mensaje = "Ticket no encontrada";

                res.json({data: tickets[0], mensaje});

            }

        });

    }

}

function agregarTicket(req, res) {

    if(connection) {

        console.log(req.body);
        const ticket = req.body;

        if(!ticket.Nombre) {

            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});            

        }

        if(ticket.Nombre.length > 50) {

            return res.status(400).send({error: true, mensaje: "El nombre debe contener a lo mucho 50 caracteres"});            


        }

        if(ticket.Descripcion.length > 100) {

            return res.status(400).send({error: true, mensaje: "La descripcion debe contener a lo mucho 100 caracteres"});            


        }

        if(!ticket.Prioridad) {

            return res.status(400).send({error: true, mensaje: "Debe contener una prioridad"});            

        }

        if(!ticket.Personal) {

            return res.status(400).send({error: true, mensaje: "Debe contener un personal"});            


        }

        if(!ticket.Categoria) {

            return res.status(400).send({error: true, mensaje: "Debe contener una categoria"});            


        }

        if(!ticket.Estatus) {

            return res.status(400).send({error: true, mensaje: "Debe contener un estatus"});            

        }

        if(ticket.Estatus.length != 3) {

            return res.status(400).send({error: true, mensaje: "Estatus debe contener exactamente 3 caracteres"});            

        }

        let query = "INSERT INTO Tickets set ?";

        connection.query(query, [ticket], (err, data) => {

            if(err) {

                console.log(err);

            } else {

                res.json({data, mensaje: "Ticket creada con exito"});

            }

        });

    }

}

function editarTicket(req, res) {

    if(connection) {

        const {id} = req.params;
        const ticket = req.body;

        if(!ticket.Nombre) {

            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});            

        }

        if(ticket.Nombre.length > 50) {

            return res.status(400).send({error: true, mensaje: "El nombre debe contener a lo mucho 50 caracteres"});            


        }

        if(!ticket.Prioridad) {

            return res.status(400).send({error: true, mensaje: "Debe contener una prioridad"});            


        }

        if(!ticket.Estatus) {

            return res.status(400).send({error: true, mensaje: "Debe contener un estatus"});            

        }

        if(ticket.Estatus.length != 3) {

            return res.status(400).send({error: true, mensaje: "Estatus debe contener exactamente 3 caracteres"});            

        }

        let query = "UPDATE Tickets set ? WHERE ID = ?";

        connection.query(query, [ticket, id], (err, data) => {

            if(err) {

                res.json(err);

            } else {

                let mensaje = "";

                if(data.changedRows === 0) {

                    mensaje = "La informacion es la misma";

                } else {
                    mensaje = "Ticket actualizada con exito"
                }

                res.json({error: false, data, mensaje});

            }

        });

    }

}

function editarEstatus(req, res) {

    if(connection) {

        const {id} = req.params;
        const Estatus = req.body;

        console.log(Estatus)

        let query = `UPDATE Tickets set Estatus = ${Estatus} WHERE ID = ${id}`;

        connection.query(query, (err, data) => {

            if(err) {

                res.json(err);

            } else {

                let mensaje = "";

                if(data.changedRows === 0) {

                    mensaje = "La informacion es la misma";

                } else {
                    mensaje = "Estatus actualizado con exito"
                }

                res.json({error: false, data, mensaje});

            }

        });

    }

}

function eliminarTicket(req, res) {

    if(connection) {

        const { id } = req.params;

        let query = "DELETE FROM Tickets WHERE ID = ?";

        connection.query(query, [id], (err, data) => {

            if(err) {

                res.json(err);

            } else {

                let mensaje = "";

                if(data.affectedRows === 0) {

                    mensaje = "Ticket no encontrado";

                } else {


                    mensaje = "Ticket eliminado con exito";

                }

                res.json({error: false, data, mensaje});

            }

        });

    }

}

module.exports = {

    listar,
    obtenerTicket,
    agregarTicket,
    editarTicket,
    eliminarTicket,
    editarEstatus

}