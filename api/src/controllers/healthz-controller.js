const GatewayUnavailableError = require('../exceptions/gateway-unavailable-error')
const logger = require('../helpers/logger')
const { MongoRepository } = require('../repository')

class Healthz {
  static async get (req, res) {
    try {
      await MongoRepository.ping()
      return res.end()
    } catch (error) {
      logger.error(`Error message: ${error}`)
      throw new GatewayUnavailableError(error)
    }
  }
}

module.exports = Healthz
