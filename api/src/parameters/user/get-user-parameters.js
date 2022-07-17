const { Parser, DocumentValidator, ParameterValidator } = require('../../helpers')
const { validationErrors, acceptedFilters } = require('../../constants')

class GetUserParameters {
  static processParameters (req) {
    this.errors = []

    this.orderFilter = req.query.orderFilter
    this.order = req.query?.order && Parser.parseInt(req.query.order)
    this.offset = req.query?.offset && Parser.parseInt(req.query.offset)
    this.limit = req.query?.limit && Parser.parseInt(req.query.limit)
    this.isBlocked = req.query?.isBlocked && Parser.parseBoolean(req.query.isBlocked)
    this.document = req.query.document

    _validate(this)

    return this
  }
}

const _validate = (parameters) => {
  // Order validate format
  ParameterValidator
    .validate(parameters.order, validationErrors.order, parameters.errors)
    .isOptional()
    .isNumber()

  // OrderFilter validate format
  ParameterValidator
    .validate(parameters.orderFilter, validationErrors.orderFilter, parameters.errors)
    .isOptional()
    .isString()
    .isValid(() => {
      if (acceptedFilters.indexOf(parameters.orderFilter) === -1) {
        parameters.errors.push(validationErrors.orderFilter.invalid)
      }
    })

  // Offset validate format and keys
  ParameterValidator
    .validate(parameters.offset, validationErrors.offset, parameters.errors)
    .isOptional()
    .isNumber()

  // Limit validate format and keys
  ParameterValidator
    .validate(parameters.limit, validationErrors.limit, parameters.errors)
    .isOptional()
    .isNumber()

  // IsBlocked validate format
  ParameterValidator
    .validate(parameters.isBlocked, validationErrors.isBlocked, parameters.errors)
    .isOptional()
    .isBoolean()

  // Document validate format
  ParameterValidator
    .validate(parameters.document, validationErrors.document, parameters.errors)
    .isOptional()
    .isString()
    .isValid(() => {
      if (!DocumentValidator.validateDocument(parameters.document)) {
        parameters.errors.push(validationErrors.document.invalid)
      }
    })
}

module.exports = GetUserParameters
