const { ParameterValidator } = require('../../helpers')
const { validationErrors } = require('../../constants')

class DeleteUserParameters {
  static processParameters (req) {
    this.errors = []
    this.userId = req.params.userId

    _validate(this)

    return this
  }
}

const _validate = (parameters) => {
  // ObjectId validate format
  ParameterValidator
    .validate(parameters.userId, validationErrors.userId, parameters.errors)
    .isObjectId()
}

module.exports = DeleteUserParameters
