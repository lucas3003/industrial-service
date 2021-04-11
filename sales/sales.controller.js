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

    async getById(req, res, next) {
        const item = await this.salesModel.getById(req.params.id);
        res.send(item);
    }

    async create(req, res, next) {
        try {
            const id = uuidv4();
            req.body.id = id;

            try {
                await this.salesModel.create(req.body);
                await this._sendToProduction(id);

                //If everything goes fine: Sent to production
            } catch(err) {
                //TODO: err should be instanceof the quantity problem
                console.error("Sale not sent to production: ", err)
                //Status: Not sent to production
            } finally {
                return res.sendStatus(200);
            }
        } catch (err) {
            console.error('Insert sale failed: ', err)
            return res.sendStatus(400).send(err);
        }   
    }

    async sendToProduction(req, res, next) {
        try {
            await this._sendToProduction(req.body.id)
            return res.sendStatus(200);
        } catch(err) {
            console.error("Sale not sent to production: ", err)
            return res.sendStatus(400);
        }
    }

    async _sendToProduction(id) {
        const saleData = await this.salesModel.getById(id);

        await this.productionModel.newProduction(
            {
                productId: saleData.productId,
                qty: saleData.soldUnits
            }
        )

        await this.salesModel.updateSentToProduction(id, true);
    }



}

module.exports = SalesController;