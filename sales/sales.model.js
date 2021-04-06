const AWS = require('aws-sdk');
const _ = require('lodash');


class SalesModel {

    constructor() {
        this.ddb = new AWS.DynamoDB({region: 'us-east-1'});
        this.tableName = "Sales"
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

    async getAllItems() {

        const params = {
            TableName: this.tableName
        }

        try {
            const data = await this.ddb.scan(params).promise();
            const unwrapedData = _.map(data.Items, (item) => AWS.DynamoDB.Converter.unmarshall(item));
            return unwrapedData;
        } catch(err) {
            console.error('Error getting Sales data ', err);
            throw err;
        }
    }
}

module.exports = SalesModel