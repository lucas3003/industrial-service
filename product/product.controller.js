const ProductModel = require('./product.model');

const _ = require('lodash');

class ProductController {
    constructor() {
        this.productModel = new ProductModel();
    }

    async getById(req, res, next) {
        const item = await this.productModel.getById(req.params.id);
        res.send(item);
    }

    async get(req, res, next) {
        const allItems = await this.productModel.getAllItems();
        res.setHeader("X-Total-Count", _.size(allItems));
        res.send(allItems); 
    }

}

module.exports = ProductController;