const express = require('express');
const SupplyController = require('./supply.controller');
const supplyRoutes = express.Router();

const supplyController = new SupplyController();

supplyRoutes.get('/', (req, res, next) => supplyController.get(req, res, next));

module.exports = supplyRoutes;