const { Parser, DocumentValidator, ParameterValidator } = require('../../helpers')
const { validationErrors, mongoConfig } = require('../../constants')

class PostUserParameters {
  static async processParameters (req) {
    this.errors = []

    this.userName = req.body?.userName
    this.document = req.body?.document
    this.blocked = req.body?.blocked && Parser.parseBoolean(req.body.blocked)

    await _validate(this, req)

    return this
  }
}

const _validate = async (parameters, req) => {
  // UserName validate format
  ParameterValidator
    .validate(parameters.userName, validationErrors.userName, parameters.errors)
    .isString()

  // Document validate format
  await ParameterValidator
    .validate(parameters.document, validationErrors.document, parameters.errors)
    .isString()
    .isValid(async () => {
      if (!DocumentValidator.validateDocument(parameters.document)) {
        parameters.errors.push(validationErrors.document.invalid)
      }

      const alreadyExists = await req.mongo.findOne({ document: parameters.document }, mongoConfig.COLLECTION)
      if (alreadyExists) {
        parameters.errors.push(validationErrors.document.already)
      }
    })

  // IsBlocked validate format
  ParameterValidator
    .validate(parameters.blocked, validationErrors.isBlocked, parameters.errors)
    .isBoolean()
}

module.exports = PostUserParameters
