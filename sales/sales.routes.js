const express = require('express');
const SalesController = require('./sales.controller');
const salesRoutes = express.Router();

const salesController = new SalesController();

salesRoutes.get('/', (req, res, next) => salesController.get(req, res, next));
salesRoutes.post('/', (req, res, next) => salesController.create(req, res, next))

module.exports = salesRoutes;