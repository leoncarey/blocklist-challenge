const { GetBlocklistParameters } = require('../parameters')
const { ValidationError } = require('../exceptions')
const MongoRepository = require('../repository/mongo-repository')

class BlocklistController {
  static async get (req, res) {
    const parameters = GetBlocklistParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    const users = await MongoRepository.findWithPagination(parameters, 'users')
    res.status(200).send(users)
  }
}

module.exports = BlocklistController
