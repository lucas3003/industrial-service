const express = require('express');
const ProductionController = require('./production.controller');
const productionRoutes = express.Router();

const productionController = new ProductionController();

productionRoutes.get('/', (req, res, next) => productionController.get(req, res, next));

module.exports = productionRoutes;