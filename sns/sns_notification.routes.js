const express = require('express');
const SnsNotificationController = require('./sns_notification.controller');
const snsNotificationRoutes = express.Router();

const snsNotificationController = new SnsNotificationController();

snsNotificationRoutes.post('/', (req, res, next) => snsNotificationController.newMessage(req, res, next))


module.exports = snsNotificationRoutes;