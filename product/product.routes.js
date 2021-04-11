const express = require('express');
const ProductController = require('./product.controller');
const productRoutes = express.Router();

const productController = new ProductController();

productRoutes.get('/:id', (req, res, next) => productController.getById(req, res, next));
productRoutes.get('/', (req, res, next) => productController.get(req, res, next));


module.exports = productRoutes;