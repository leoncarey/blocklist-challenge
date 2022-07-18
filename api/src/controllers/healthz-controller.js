const { ServiceUnavailableError } = require('../exceptions')

class HealthzController {
  static async get (req, res) {
    try {
      await req.mongo.ping()
      return res.end()
    } catch (error) {
      throw new ServiceUnavailableError(error)
    }
  }
}

module.exports = HealthzController
