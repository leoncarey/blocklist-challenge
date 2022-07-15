const BaseError = require('./base-error')
const { httpErrors } = require('../constants')

class ServiceUnavailableError extends BaseError {
  constructor () {
    super(503, JSON.stringify(httpErrors.serviceUnavailable))
  }
}

module.exports = ServiceUnavailableError
