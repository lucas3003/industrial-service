const AWS = require('aws-sdk');
const _ = require('lodash');
const BaseModel = require('../model/BaseModel');

class SupplyModel extends BaseModel {
    constructor() {
        super('Supplies');
        //this.ddb = new AWS.DynamoDB({region: 'us-east-1'});
        this.tableName = 'Supplies';
    }

    async getAllItems() {
        const params = {
            TableName: this.tableName
        }

        try {
            const data = await this.ddb.scan(params).promise();
            const unwrapedData = _.map(data.Items, (item) => AWS.DynamoDB.Converter.unmarshall(item));  
            return unwrapedData;
        } catch (err) {
            console.error('Error getting Supply data ', err);
            throw err;
        }
    }

    async getById(id) {
        return super.getById(id);
    }

    async create({id, description, qty}) {
        const params = {
            TableName: this.tableName,
            Item: {
                'id': {S: id},
                'description': {S: description},
                'qty': {N: qty.toString()}
            }
        }

        try {
            await this.ddb.putItem(params).promise();
            return true;
        } catch(err) {
            console.error("Error registering new supply: ", err);
            throw err;
        }
    }

    async updateQuantity(id, newQuantity) {
        const params = {
            TableName: this.tableName,
            Key: {
                "id": {
                    "S": id
                }
            },
            UpdateExpression: "set qty = :qty",
            ExpressionAttributeValues:{
                ":qty": {"N": newQuantity.toString()},
            },
            ReturnValues:"UPDATED_NEW"
        }

        console.error("params")
        console.error(params)

        console.error("newQuantity: ", newQuantity)

        const updateResult = await this.ddb.updateItem(params).promise();
        return updateResult;
    }
}

module.exports = SupplyModel;