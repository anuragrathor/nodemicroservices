//HTTP request logger middleware for node.js

const fs = require('fs')
const morgan = require('morgan')
const path = require('path');


// create a rotating write stream // rotate daily
// var accessLogStream = fs.createWriteStream('logs/morgan-log.log', {
//     interval: '1d', 
//     path: path.join('logs/morgan-log', 'log')
//   })


// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'morgan-log.log'), { flags: 'a' })  //Create file in same directory
var accessLogStream = fs.createWriteStream(path.join('logs/morgan-log.log'), { flags: 'a' })

const morgan_var = morgan(':method :url :status :http-version :res[content-length] :response-time ms', { stream: accessLogStream })

//:method :url :status :http-version :res[content-length] - :response-time ms

// const morgan_var = morgan('combined', { stream: accessLogStream })
// const morgan_var = morgan('tiny', { stream: accessLogStream })
// const morgan_var = morgan('short', { stream: accessLogStream })  // It also log API execution time 
// const morgan_var = morgan('dev', { stream: accessLogStream })    // It log API execution time 
// const morgan_var = morgan('common', { stream: accessLogStream })


// EXAMPLE: only log error responses
// morgan('combined', {
//     skip: function (req, res) { return res.statusCode < 400 }
//   })

  

//Using a Custom Format Function
// morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms'
//     ].join(' ')
//   })
  




module.exports = morgan_var;