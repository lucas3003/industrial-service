const request = require('request');
const util = require('util');

const SupplyController = require('../supply/supply.controller')

class SnsNotificationController {
    constructor() {
        this.supplyController = new SupplyController();
    }

    async newMessage(req, res, next) {
        if (req.header('x-amz-sns-message-type') === 'SubscriptionConfirmation') {
            const url = req.body.SubscribeURL;
            
            try {
                const requestPromise = util.promisify(request);
                const response = await requestPromise(url);

            } catch (err) {
                console.error('error sending request')
                console.log(err);
            }
            
        } else if (req.header('x-amz-sns-message-type') === 'Notification') {
            const message = JSON.parse(req.body.Message);
            
            switch(req.body.Subject) {
                case "NewSupply":
                    console.error(req.body)
                    return await this.supplyController.newSupply(message);
            }            
        } else {
            throw new Error(`Invalid message type ${req.Type}`);
        }
    }
}

module.exports = SnsNotificationController;