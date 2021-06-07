const express = require('express');

const routes = express.Router();

const ticketsControllers = require('../controllers/ticketsControllers');

routes.get('/tickets', ticketsControllers.listar);

routes.get('/tickets/:id', ticketsControllers.obtenerTicket);

routes.post('/tickets', ticketsControllers.agregarTicket);

routes.put('/tickets/:id', ticketsControllers.editarTicket);

routes.put('/tickets/Estatus/:id', ticketsControllers.editarEstatus);

routes.delete('/tickets/:id', ticketsControllers.eliminarTicket);

module.exports = routes;