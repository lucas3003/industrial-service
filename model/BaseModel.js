const AWS = require('aws-sdk');
const _ = require('lodash');

class BaseModel {
    constructor(tableName) {
        this.ddb = new AWS.DynamoDB({region: 'us-east-1'});
        this.tableName = tableName;
    }

    async getById(id) {
        const params = {
            TableName: this.tableName,
            Key: {
                'id': {S: id}
            }
        };

        console.error(params);

        try {
            const data = await this.ddb.getItem(params).promise();
            console.error(data);
            return AWS.DynamoDB.Converter.unmarshall(_.get(data, 'Item', {}));
        } catch(err) {
            console.error('Error getting item by id: ', err);
            throw err;
        }
    }
}

module.exports = BaseModel;