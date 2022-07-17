const { GetBlocklistParameters, PostBlocklistParameters } = require('../parameters')
const { ValidationError } = require('../exceptions')

class BlocklistController {
  static async get (req, res) {
    const parameters = GetBlocklistParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    const users = await req.mongo.findWithPagination(parameters, 'users')
    res.status(200).send(users)
  }

  static async post (req, res) {
    const parameters = PostBlocklistParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    const newUser = {
      blocked: parameters.blocked,
      document: parameters.document,
      name: parameters.userName
    }

    const insertedUser = await req.mongo.insertOne(newUser, 'users')
    res.status(200).send({ id: insertedUser.toString() })
  }
}

module.exports = BlocklistController
