const BaseError = require('./base-error')
const { httpErrors } = require('../constants')

class BadRequestError extends BaseError {
  constructor () {
    super(400, JSON.stringify(httpErrors.badRequest))
  }
}

module.exports = BadRequestError
