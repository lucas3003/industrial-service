const express = require('express');
const SalesController = require('./sales.controller');
const salesRoutes = express.Router();

const salesController = new SalesController();

salesRoutes.get('/', (req, res, next) => salesController.get(req, res, next));
salesRoutes.get('/:id', (req, res, next) => salesController.getById(req, res, next));
salesRoutes.post('/', (req, res, next) => salesController.create(req, res, next))
salesRoutes.put('/sendToProduction', (req, res, next) => salesController.sendToProduction(req, res, next))

module.exports = salesRoutes;