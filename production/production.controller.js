const ProductionModel = require('./production.model');
const _ = require('lodash');

class ProductionController {
    constructor() {
        this.productionModel = new ProductionModel();
    }

    async get(req, res, next) {
        const allItems = await this.productionModel.getAllItems();
        res.setHeader("X-Total-Count", _.size(allItems));
        res.send(allItems);
    }

}

module.exports = ProductionController;