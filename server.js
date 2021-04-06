const app = require('./src/app');
const port = normalizePort(process.env.PORT || '8080');
const host = normalizePort(process.env.HOST || 'localhost');

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

app.listen(port, host, function () {
    console.log(`IndustrialService listening on host ${host} and port ${port}`)
})