const winston = require('winston')

const loggerOptions = {
  level: 'debug',
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
}

const logger = winston.createLogger(loggerOptions)

module.exports = logger
