const GatewayUnavailableError = require('../exceptions/gateway-unavaliable-error')
const logger = require('../helpers/logger')
const { MongoRepository } = require('../repository')

class Healthz {
  static async get (req, res) {
    try {
      await MongoRepository.ping()
      return res.end()
    } catch (error) {
      logger.error(`Error message: ${error.message}`)
      throw new GatewayUnavailableError(error)
    }
  }
}

module.exports = Healthz
