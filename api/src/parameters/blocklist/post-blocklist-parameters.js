const { Parser, DocumentValidator, ParameterValidator } = require('../../helpers')
const { validationErrors } = require('../../constants')

class PostBlocklistParameters {
  static processParameters (req) {
    this.errors = []

    this.userName = req.body?.userName
    this.document = req.body?.document
    this.blocked = req.body?.blocked && Parser.parseBoolean(req.body.blocked)

    _validate(this)

    return this
  }
}

const _validate = (parameters) => {
  // UserName validate format
  ParameterValidator
    .validate(parameters.userName, validationErrors.userName, parameters.errors)
    .isString()

  // Document validate format
  ParameterValidator
    .validate(parameters.document, validationErrors.document, parameters.errors)
    .isString()
    .isValid(() => {
      if (!DocumentValidator.validateDocument(parameters.document)) {
        parameters.errors.push(validationErrors.document.invalid)
      }
    })

  // IsBlocked validate format
  ParameterValidator
    .validate(parameters.blocked, validationErrors.isBlocked, parameters.errors)
    .isBoolean()
}

module.exports = PostBlocklistParameters
