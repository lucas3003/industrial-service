/*'use strict'

const express = require('express');

// Constants
// const PORT = 80;
// const HOST = '0.0.0.0';

const PORT = 8080;
const HOST = '127.0.0.1';


// App
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/health-check', (req, res) => {
    const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send(healthcheck);
	}
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);*/

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "IndustrialService",
        version: "1.0.0"
    });
});

router.get('/health-check', (req, res) => {
    const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send(healthcheck);
	}
});

module.exports = router;
