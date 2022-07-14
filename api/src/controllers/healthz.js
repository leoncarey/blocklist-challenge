const logger = require('../helpers/logger')

class Healthz {
  static get (req, res) {
    try {
      res.end()
    } catch (error) {
      logger.error(`Error message: ${error.message}`)
    }
  }
}

module.exports = Healthz
