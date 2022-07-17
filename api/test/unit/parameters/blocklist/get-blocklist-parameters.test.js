const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')

const { GetBlocklistParameters } = require('../../../../src/parameters')
const { validationErrors } = require('../../../../src/constants')

describe('Tests for GetBlocklistParameters', function () {
  const req = {}

  beforeEach(function () {
    req.params = {
      document: cpf.generate(),
      isBlocked: true,
      offset: 0,
      order: -1,
      orderFilter: 'order'
    }
  })

  it('should not return errors with all valid parameters', function () {
    const parameters = GetBlocklistParameters.processParameters(req)
    assert(parameters.errors.length === 0)
  })

  describe('Tests for orderFilter', function () {
    it('should return invalid error with orderFilter invalid', function () {
      req.params.orderFilter = 123458
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.orderFilter.invalid])
    })

    it('should return invalid error with orderFilter invalid if filter name is invalid', function () {
      req.params.orderFilter = 'foo'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.orderFilter.invalid])
    })
  })

  describe('Tests for order', function () {
    it('should return invalid error if order is not number', function () {
      req.params.order = 'foo'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.order.invalid])
    })
  })

  describe('Tests for offset', function () {
    it('should return invalid error with offset is string', function () {
      req.params.offset = 'foo'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.offset.invalid])
    })

    it('should return invalid error with offset is boolean', function () {
      req.params.offset = 'foo'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.offset.invalid])
    })
  })

  describe('Tests for limit', function () {
    it('should return invalid error with limit is string', function () {
      req.params.limit = 'foo'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.limit.invalid])
    })

    it('should return invalid error with limit is boolean', function () {
      req.params.limit = 'foo'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.limit.invalid])
    })
  })

  describe('Tests for isBlocked', function () {
    it('should return invalid error with isBlocked invalid', function () {
      req.params.isBlocked = 123458
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.isBlocked.invalid])
    })
  })

  describe('Tests for document', function () {
    it('should return invalid error with document invalid', function () {
      req.params.document = 854113
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })

    it('should return invalid error with document so big', function () {
      req.params.document = '854113564545465456465'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })
  })
})