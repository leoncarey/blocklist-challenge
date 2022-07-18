const { GetUserParameters, PostUserParameters } = require('../parameters')
const { ValidationError } = require('../exceptions')
const { mongoConfig } = require('../constants')

class UserController {
  static async get (req, res) {
    const parameters = GetUserParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    const users = await req.mongo.findWithPagination(parameters, mongoConfig.COLLECTION)
    return res.status(200).send(users)
  }

  static async post (req, res) {
    const parameters = PostUserParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    const nextOrderSequence = await req.mongo.getLastNextOrderSequence(mongoConfig.COLLECTION)
    const newUser = {
      blocked: parameters.blocked,
      document: parameters.document,
      documentType: _getDocumentType(parameters.document),
      name: parameters.userName,
      order: nextOrderSequence
    }

    const insertedUser = await req.mongo.insertOne(newUser, mongoConfig.COLLECTION)
    return res.status(200).send({ id: insertedUser.toString() })
  }

  static delete (req, res) {
    res.status(200).send({})
  }
}

const _getDocumentType = (document) => (document.length === 11 ? 'CPF' : 'CNPJ')

module.exports = UserController
