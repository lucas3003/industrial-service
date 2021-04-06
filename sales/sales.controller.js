const SalesModel = require('./sales.model');
const ProductionModel = require('../production/production.model');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

class SalesController {
    constructor() {
        this.salesModel = new SalesModel();
        this.productionModel = new ProductionModel();
    }

    async get(req, res, next) {
        const allItems = await this.salesModel.getAllItems();
        res.setHeader("X-Total-Count", _.size(allItems));
        res.send(allItems);
    }

    

    async create(req, res, next) {
        try {
            const id = uuidv4();
            req.body.id = id;
            await this.salesModel.create(req.body);

            try {
                await this.productionModel.newProduction(
                    {
                        productId: req.body.productId,
                        qty: req.body.soldUnits
                    }
                )

                await this.salesModel.updateSentToProduction(id, true);

                //If everything goes fine: Sent to production
            } catch(err) {
                //TODO: err should be instanceof the quantity problem
                console.error("Sale not sent to production: ", err)
                //Status: Not sent to production
            } finally {
                return res.sendStatus(200);
            }

            //Trigger production. That should actually put a production request on a queue
            //Then production could execute messages once at time
        } catch (err) {
            console.error('Insert sale failed: ', err)
            return res.sendStatus(400).send(err);
        }
        
    }
}

module.exports = SalesController;