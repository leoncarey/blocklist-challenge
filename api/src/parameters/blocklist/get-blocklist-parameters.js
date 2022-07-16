const { Parser, DocumentValidator } = require('../../helpers')
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
  if (
    (parameters.order !== undefined && isNaN(parameters.order)) ||
    (parameters.order && typeof parameters.order !== 'number')
  ) {
    parameters.errors.push(validationErrors.order.invalid)
  }

  // OrderFilter validate format
  if (parameters.orderFilter !== undefined && typeof parameters.orderFilter !== 'string') {
    parameters.errors.push(validationErrors.orderFilter.invalid)
  } else if (parameters.orderFilter !== undefined && acceptedFilters.indexOf(parameters.orderFilter) === -1) {
    parameters.errors.push(validationErrors.orderFilter.invalid)
  }

  // Offset validate format and keys
  if (
    (parameters.offset !== undefined && isNaN(parameters.offset)) ||
    (parameters.offset && typeof parameters.offset !== 'number')
  ) {
    parameters.errors.push(validationErrors.offset.invalid)
  }

  // Limit validate format and keys
  if (
    (parameters.limit !== undefined && isNaN(parameters.limit)) ||
    (parameters.limit && typeof parameters.limit !== 'number')
  ) {
    parameters.errors.push(validationErrors.limit.invalid)
  }

  // IsBlocked validate format
  if (parameters.isBlocked !== undefined && typeof parameters.isBlocked !== 'boolean') {
    parameters.errors.push(validationErrors.isBlocked.invalid)
  }

  // Document validate format
  if (parameters.document !== undefined && !DocumentValidator.validateDocument(parameters.document)) {
    parameters.errors.push(validationErrors.document.invalid)
  }
}

module.exports = GetBlocklistParameters
