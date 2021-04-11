const SupplyModel = require('./supply.model');

class SupplyController {
    constructor() {
        this.supplyModel = new SupplyModel();
    }

    async get(req, res, next) {
        const allItems = await this.supplyModel.getAllItems();
        res.send(allItems);
    }

    async newSupply(payload, res) {
        try {
            await this.supplyModel.create(payload);
            return res.sendStatus(200);
        } catch(err) {
            return res.sendStatus(400).send(err);
        }   
    }
}

module.exports = SupplyController;