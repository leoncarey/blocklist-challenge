const BaseError = require('./base-error')
const { httpErrors } = require('../constants')

class UnauthorizedError extends BaseError {
  constructor () {
    super(401, JSON.stringify(httpErrors.unauthorized))
  }
}

module.exports = UnauthorizedError
