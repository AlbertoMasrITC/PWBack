const express = require('express');

const routes = express.Router();

const categoriasControllers = require('../controllers/categoriasControllers');

routes.get('/categorias', categoriasControllers.listar);

routes.get('/categorias/:id', categoriasControllers.obtenerCategoria);

routes.post('/categorias', categoriasControllers.agregarCategoria);

routes.delete('/:id', categoriasControllers.eliminarCategoria);

module.exports = routes;