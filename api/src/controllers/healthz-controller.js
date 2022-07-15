const { ServiceUnavailableError } = require('../exceptions')
const logger = require('../helpers/logger')
const { MongoRepository } = require('../repository')

class Healthz {
  static async get (req, res) {
    try {
      await MongoRepository.ping()
      return res.end()
    } catch (error) {
      logger.error(`Error message: ${error}`)
      throw new ServiceUnavailableError(error)
    }
  }
}

module.exports = Healthz
