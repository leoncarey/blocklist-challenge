const BaseError = require('./base-error')
const { httpErrors } = require('../constants')

class ValidationError extends BaseError {
  constructor (errorDetail) {
    const message = httpErrors.validation

    if (errorDetail) {
      message.errorDetail = errorDetail
    }

    super(400, JSON.stringify(message))
  }
}

module.exports = ValidationError
