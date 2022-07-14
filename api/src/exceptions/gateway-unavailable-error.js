class GatewayUnavailableError extends Error {
  constructor (error) {
    super(error.message)
    this.error = error
  }
}

module.exports = GatewayUnavailableError
