const connection = require('../config/conexiones');

function listar(req, res) {

    if(connection) {

        let query = "SELECT * FROM Categorias";
        connection.query(query, (err, categorias) => {

            if(err) {

                res.json(err);

            } else {

                console.log(categorias);
                res.json({categorias});

            }

        });

    }

}

function obtenerCategoria(req, res) {

    if(connection) {

        const { id } = req.params;
        let query = `SELECT * FROM Categorias WHERE ID = ${connection.escape(id)}`;

        connection.query(query, (err, categoria) => {

            if(err) {

                console.log(err);

            } else {

                var mensaje = "";
                
                if(categoria === undefined || categoria.length == 0)
                    mensaje = "Categoria no encontrada";

                res.json({data: categoria, mensaje});

            }

        });

    }

}

function agregarCategoria(req, res) {

    if(connection) {

        console.log(req.body);
        const categoria = req.body;

        if(!categoria.nombre) {

            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});            

        }

        let query = "INSERT INTO Categorias set ?";

        connection.query(query, [categoria], (err, data) => {

            if(err) {

                console.log(err);

            } else {

                res.json({data, mensaje: "Categoria creada con exito"});

            }

        });

    }

}

function eliminarCategoria(req, res) {

    if(connection) {

        const { id } = req.params;

        let query = "DELETE FROM Categorias WHERE ID = ?";

        connection.query(query, [id], (err, data) => {

            if(err) {

                res.json(err);

            } else {

                let mensaje = "";

                if(data.affectedRows === 0) {

                    mensaje = "Categoria no encontrada";

                } else {


                    mensaje = "Categoria eliminada con exito";

                }

                res.json({error: false, data});

            }

        });

    }

}

module.exports = {

    listar,
    obtenerCategoria,
    agregarCategoria,
    eliminarCategoria

}