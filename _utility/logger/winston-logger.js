const winston = require("winston");




// Logger configuration
const logConfigurationFile = {
  level: "debug",
  format: winston.format.json(),
  transports: [
      new winston.transports.Console({
          level: 'warn'
      }),
      new winston.transports.File({
          level: 'error',
          // Create the log directory if it does not exist
          filename: 'logs/winston-logger.log'
      })
  ]
};


const logConfigurationConsole = {
  transports: [
      new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.label({
          label: `Label🏷️`
      }),
      winston.format.timestamp({
         format: 'MMM-DD-YYYY HH:mm:ss'
     }),
      winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
  )
};


//const logger = winston.createLogger(logConfigurationConsole);   //Print Log on console
const logger = winston.createLogger(logConfigurationFile);   // Save Log into File




module.exports = logger;