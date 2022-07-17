const { Parser, DocumentValidator, ParameterValidator } = require('../../helpers')
const { validationErrors, acceptedFilters } = require('../../constants')

class GetBlocklistParameters {
  static processParameters (req) {
    this.errors = []

    this.orderFilter = req.params.orderFilter
    this.order = req.params?.order && Parser.parseInt(req.params.order)
    this.offset = req.params?.offset && Parser.parseInt(req.params.offset)
    this.limit = req.params?.limit && Parser.parseInt(req.params.limit)
    this.isBlocked = req.params?.isBlocked && Parser.parseBoolean(req.params.isBlocked)
    this.document = req.params.document

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

module.exports = GetBlocklistParameters
