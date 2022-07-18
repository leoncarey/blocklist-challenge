const { GetUserParameters, PostUserParameters, DeleteUserParameters, UpdateUserParameters } = require('../parameters')
const { ValidationError } = require('../exceptions')
const { mongoConfig, validationErrors } = require('../constants')
const { ObjectId } = require('mongodb')

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
    return res.status(200).send({ _id: insertedUser })
  }

  static async delete (req, res) {
    const parameters = DeleteUserParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    const userDeleted = await req.mongo.deleteById(parameters.userId, mongoConfig.COLLECTION)
    if (!userDeleted) {
      throw new ValidationError(validationErrors.userId.invalid)
    }

    res.status(200).send({ userDeleted: parameters.userId })
  }

  static async update (req, res) {
    const parameters = await UpdateUserParameters.processParameters(req)
    if (parameters.errors.length !== 0) {
      throw new ValidationError(parameters.errors)
    }

    const userChanges = {
      blocked: parameters.blocked
    }

    const { _id } = await req.mongo.updateOne({ _id: new ObjectId(parameters.userId) }, userChanges, mongoConfig.COLLECTION)

    res.status(200).send({ _id })
  }
}

const _getDocumentType = (document) => (document.length === 11 ? 'CPF' : 'CNPJ')

module.exports = UserController
