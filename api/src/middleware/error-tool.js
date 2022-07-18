const { BadRequestError, ServiceUnavailableError, UnauthorizedError, ValidationError, NotFoundError } = require('../exceptions')
const { httpErrors } = require('../constants')
const { logger } = require('../helpers')

class ErrorTool {
  static async verifyError (req, res, next, controller) {
    try {
      await controller(req, res, next)
      return true
    } catch (error) {
      logger.error(`Error log: ${error.message}`)
      return _errorResponse(req, res, error)
    }
  }
}

const _errorResponse = (_req, res, error) => {
  if (error instanceof ValidationError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof UnauthorizedError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof ServiceUnavailableError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof BadRequestError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  if (error instanceof NotFoundError) {
    return res.status(error.code).json(JSON.parse(error.message))
  }

  return res.status(500).json(httpErrors.internalServerError)
    .error(error)
}

module.exports = ErrorTool
