const winstonlogger = require('../_utility/logger/winston-logger');

const request = function (req, res, next) {
    winstonlogger.info({
        url: req.url,
        method: req.method,
        originalUrl: req.originalUrl,
        ip: req.ip,
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
    });
    next();
}

module.exports = {request}
