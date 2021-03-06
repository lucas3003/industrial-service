const express = require('express');
const app = express();
const cors = require('cors');

//Routes
const index = require('../index/index');
const salesRoutes = require('../sales/sales.routes');
const snsNotificationRoutes = require('../sns/sns_notification.routes');
const supplyRoutes = require('../supply/supply.routes');
const productRoutes = require('../product/product.routes');
const productionRoutes = require('../production/production.routes');

app.use(cors());

app.use(function(req, res, next) {
    if (req.get('x-amz-sns-message-type')) {
        req.headers['content-type'] = 'application/json';
    }
    next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/', index);
app.use('/sales', salesRoutes);
app.use('/snsnotification', snsNotificationRoutes);
app.use('/supply', supplyRoutes);
app.use('/product', productRoutes);
app.use('/production', productionRoutes);

module.exports = app;
