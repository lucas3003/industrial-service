const AWS = require('aws-sdk');
const BaseModel = require('../model/BaseModel');

class ProductModel extends BaseModel {

    constructor() {
        super('Products')
        this.ddb = new AWS.DynamoDB({region: 'us-east-1'});
        //this.tableName = 'Products';
    }

    async getById(id) {
        return super.getById(id);
    }
}

module.exports = ProductModel;