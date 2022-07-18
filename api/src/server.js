const app = require('./app')
const { logger } = require('./helpers')
const { MetricsTool } = require('./middleware')

const PORT = process.env.SERVER_PORT || 11000
const metricsInterval = MetricsTool.collectMetrics()

const server = app.listen(PORT, () => {
  logger.info('Http server on deline')
})

const shutdownHandler = () => {
  clearInterval(metricsInterval)

  server.close((error) => {
    try {
      if (error) {
        logger.error('Error on close server ', error)
        process.exit(1)
      } else {
        logger.info('Http server closed')
        process.exit()
      }
    } catch (err) {
      logger.error(`Error failed: ${err.message}`)
      process.exit(1)
    }
  })
}

process.on('SIGTERM', shutdownHandler)
process.on('SIGINT', shutdownHandler)
