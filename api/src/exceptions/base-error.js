class BaseError extends Error {
  constructor (code, message, clientError) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.clientError = clientError
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = BaseError
