const BaseError = require('./base-error')
const { httpErrors } = require('../constants')

class NotFoundError extends BaseError {
  constructor (errorDetail) {
    const message = httpErrors.notFound

    if (errorDetail) {
      message.errorDetail = errorDetail
    }

    super(404, JSON.stringify(message))
  }
}

module.exports = NotFoundError
