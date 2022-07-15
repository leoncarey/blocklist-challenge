const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')

const { GetBlocklistParameters } = require('../../../../src/parameters')
const { validationErrors } = require('../../../../src/constants')

describe('Tests for GetBlocklistParameters', function () {
  const req = {}

  before(function () {
    req.params = {
      document: cpf.generate(),
      isBlocked: true,
      offset: 0,
      order: 'ASC',
      orderFilter: 'order'
    }
  })

  it('should not return errors with all valid parameters', function () {
    const parameters = GetBlocklistParameters.processParameters(req)
    assert(parameters.errors.length === 0)
  })

  describe('Tests for orderFilter', function () {
    before(function () {
      req.params = {
        orderFilter: 'name'
      }
    })

    it('should not return errors', function () {
      const parameters = GetBlocklistParameters.processParameters(req)
      assert(parameters.errors.length === 0)
    })

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
    before(function () {
      req.params = {
        order: 'ASC'
      }
    })

    it('should not return errors', function () {
      const parameters = GetBlocklistParameters.processParameters(req)
      assert(parameters.errors.length === 0)
    })

    it('should return invalid error if order is not string', function () {
      req.params.order = 123458
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.order.invalid])
    })

    it('should return invalid error with order is not equal ASC or DESC', function () {
      req.params.order = 'foo'
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.order.invalid])
    })
  })

  describe('Tests for offset', function () {
    before(function () {
      req.params = {
        offset: 10
      }
    })

    it('should not return errors', function () {
      const parameters = GetBlocklistParameters.processParameters(req)
      assert(parameters.errors.length === 0)
    })

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
    before(function () {
      req.params = {
        limit: 50
      }
    })

    it('should not return errors', function () {
      const parameters = GetBlocklistParameters.processParameters(req)
      assert(parameters.errors.length === 0)
    })

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
    before(function () {
      req.params = {
        isBlocked: false
      }
    })

    it('should not return errors', function () {
      const parameters = GetBlocklistParameters.processParameters(req)
      assert(parameters.errors.length === 0)
    })

    it('should return invalid error with isBlocked invalid', function () {
      req.params.isBlocked = 123458
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.isBlocked.invalid])
    })
  })

  describe('Tests for document', function () {
    before(function () {
      req.params = {
        document: cpf.generate()
      }
    })

    it('should not return errors', function () {
      const parameters = GetBlocklistParameters.processParameters(req)
      assert(parameters.errors.length === 0)
    })

    it('should return invalid error with document invalid', function () {
      req.params.document = 854113
      const parameters = GetBlocklistParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })
  })
})
