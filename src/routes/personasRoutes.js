const express = require('express');

const routes = express.Router();

const personasControllers = require('../controllers/personasControllers');
const { route } = require('./categoriasRoutes');

routes.get('/personas', personasControllers.listar);

routes.get('/personas/:id', personasControllers.obtenerPersonal);

routes.post('/personas', personasControllers.agregarPersonal);

routes.put('/personas', personasControllers.editarPersonal);

routes.delete('/:id', personasControllers.eliminarPersonal);

module.exports = routes;