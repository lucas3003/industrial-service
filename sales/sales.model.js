const AWS = require('aws-sdk');
const _ = require('lodash');
const BaseModel = require('../model/BaseModel');

class SalesModel extends BaseModel {

    constructor() {
        super("Sales");
    }

    async create({id, productId, date, soldUnits, countryOfDestiny, unitAmount}) {
        const params = {
            TableName: this.tableName,
            Item: {
                'id': {S: id},
                'productId': {S: productId},
                'date': {S: date},
                'soldUnits': {N: soldUnits.toString()},
                'countryOfDestiny': {S: countryOfDestiny},
                'unitAmount': {N: unitAmount.toString()},
                "sentToProduction": {BOOL: false}
            }
        };

        try{
            await this.ddb.putItem(params).promise();
            return true;
        } catch(err) {
            console.error('Failed to write a sale on dynamodb ', err);
            return false;
        }   
    }

    async updateSentToProduction(id, sentToProduction) {
        const params = {
            TableName: this.tableName,
            Key: {
                "id": {
                    "S": id
                }
            },
            UpdateExpression: "set sentToProduction = :sentToProduction",
            ExpressionAttributeValues: {
                ":sentToProduction": {"BOOL": sentToProduction}
            },
            ReturnValues: "UPDATED_NEW"
        }

        const updateResult = await this.ddb.updateItem(params).promise();
        return updateResult;

    }
}

module.exports = SalesModel