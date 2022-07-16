const { ServiceUnavailableError } = require('../exceptions')
const logger = require('../helpers/logger')

class HealthzController {
  static async get (req, res) {
    try {
      await req.mongo.ping()
      return res.end()
    } catch (error) {
      logger.error(`Error message: ${error}`)
      throw new ServiceUnavailableError(error)
    }
  }
}

module.exports = HealthzController
