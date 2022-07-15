const { GetBlocklistParameters } = require('../parameters')
const { ValidationError } = require('../exceptions')

class BlocklistController {
  static get (req, res) {
    const parameters = GetBlocklistParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    res.json()
  }
}

module.exports = BlocklistController
