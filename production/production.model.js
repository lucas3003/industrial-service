const AWS = require('aws-sdk');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');


const SupplyModel = require('../supply/supply.model');
const ProductModel = require('../product/product.model');
const { now } = require('lodash');

class ProductionModel {

    constructor() {
        this.ddb = new AWS.DynamoDB({region: 'us-east-1'});
        this.tableName = 'Production';

        this.supplyModel = new SupplyModel();
        this.productModel = new ProductModel();
    }

    async newProduction({productId, qty}) {

        const product = await this.productModel.getById(productId);
        const productSupplies = _.get(product, 'supplies', []);

        //Check if product has all supplies available
        for(let i = 0; i < productSupplies.length; i++) {
            const availableSupply = await this.supplyModel.getById(productSupplies[i].id);
            if(!this.isSupplyEnough(productSupplies[i].qty*qty, availableSupply.qty)) {
                console.error("Quantity is not enough");
                throw new Error("Quantity is not enough");
            }
        }

        //Update supply quantity
        for(let i = 0; i < productSupplies.length; i++) {
            const availableSupply = await this.supplyModel.getById(productSupplies[i].id);
            this.supplyModel.updateQuantity(availableSupply.id, availableSupply.qty-productSupplies[i].qty*qty);
        }

        //Persist production data
        await this.persistProduction({productId, qty});

        //TODO: Send production info to SOAP
    }

    async persistProduction({productId, qty}) {
        const params = {
            TableName: this.tableName,
            Item: {
                'id': {S: uuidv4()},
                'productId': {S: productId},
                'qty': {N: qty.toString()},
                'date': {S: new Date().toISOString().split("T")[0]}
            }
        }

        try{
            await this.ddb.putItem(params).promise();
            return true;
        } catch(err) {
            console.error("Error registering new production: ", err);
            throw err;
        }
    }

    isSupplyEnough(supplyNeeded, supplyAvailable) {
        console.error("supplyNeeded: ", supplyNeeded);
        console.error("supplyAvailable: ", supplyAvailable)
        console.error(supplyAvailable >= supplyNeeded ? true: false);
        return supplyAvailable >= supplyNeeded ? true: false;
    }


}

module.exports = ProductionModel;