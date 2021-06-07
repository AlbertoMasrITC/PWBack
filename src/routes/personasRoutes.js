const express = require('express');

const routes = express.Router();

const personasControllers = require('../controllers/personasControllers');

routes.get('/personas', personasControllers.listar);

routes.get('/personas/:id', personasControllers.obtenerPersonal);

routes.post('/personas', personasControllers.agregarPersonal);

routes.put('/personas/:id', personasControllers.editarPersonal);

routes.delete('/personas/:id', personasControllers.eliminarPersonal);

module.exports = routes;