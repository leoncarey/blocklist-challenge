const { Parser, ParameterValidator } = require('../../helpers')
const { validationErrors, mongoConfig } = require('../../constants')
const { ObjectId } = require('mongodb')

class UpdateUserParameters {
  static async processParameters (req) {
    this.errors = []

    this.userId = req.params.userId
    this.blocked = req.body?.blocked && Parser.parseBoolean(req.body.blocked)

    await _validate(this, req)

    return this
  }
}

const _validate = (parameters, req) => {
  ParameterValidator
    .validate(parameters.userId, validationErrors.userId, parameters.errors)
    .isObjectId()
    .isValid(async () => {
      const userIdExists = await req.mongo.findOne({ _id: new ObjectId(parameters.userId) }, mongoConfig.COLLECTION)
      if (!(userIdExists)) {
        parameters.errors.push(validationErrors.userId.invalid)
      }
    })

  // IsBlocked validate format
  ParameterValidator
    .validate(parameters.blocked, validationErrors.isBlocked, parameters.errors)
    .isOptional()
    .isBoolean()
}

module.exports = UpdateUserParameters
