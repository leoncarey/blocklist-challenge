const winston = require('winston')

const loggerOptions = {
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  level: 'debug',
  transports: [new winston.transports.Console()]
}

const logger = winston.createLogger(loggerOptions)

module.exports = logger
