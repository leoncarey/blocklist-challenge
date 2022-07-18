const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')

const { GetUserParameters } = require('../../../../src/parameters')
const { validationErrors } = require('../../../../src/constants')

describe('Tests for GetUserParameters', function () {
  const req = {}

  beforeEach(function () {
    req.query = {
      document: cpf.generate(),
      isBlocked: true,
      offset: 0,
      order: -1,
      orderFilter: 'order',
      userName: 'Foo'
    }
  })

  it('should not return errors with all valid parameters', function () {
    const parameters = GetUserParameters.processParameters(req)
    assert(parameters.errors.length === 0)
  })

  describe('Tests for orderFilter', function () {
    it('should return invalid error with orderFilter invalid', function () {
      req.query.orderFilter = 123458
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.orderFilter.invalid])
    })

    it('should return invalid error with orderFilter invalid if filter name is invalid', function () {
      req.query.orderFilter = 'foo'
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.orderFilter.invalid])
    })
  })

  describe('Tests for order', function () {
    it('should return invalid error if order is not number', function () {
      req.query.order = 'foo'
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.order.invalid])
    })
  })

  describe('Tests for offset', function () {
    it('should return invalid error with offset is string', function () {
      req.query.offset = 'foo'
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.offset.invalid])
    })

    it('should return invalid error with offset is boolean', function () {
      req.query.offset = 'foo'
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.offset.invalid])
    })
  })

  describe('Tests for limit', function () {
    it('should return invalid error with limit is string', function () {
      req.query.limit = 'foo'
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.limit.invalid])
    })

    it('should return invalid error with limit is boolean', function () {
      req.query.limit = 'foo'
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.limit.invalid])
    })
  })

  describe('Tests for isBlocked', function () {
    it('should return invalid error with isBlocked invalid', function () {
      req.query.isBlocked = 123458
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.isBlocked.invalid])
    })
  })

  describe('Tests for document', function () {
    it('should return invalid error with document invalid', function () {
      req.query.document = 854113
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })

    it('should return invalid error with document so big', function () {
      req.query.document = '854113564545465456465'
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })
  })

  describe('Tests for userName', function () {
    it('should return invalid error with invalid userName', function () {
      req.query.userName = 854113
      const parameters = GetUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.userName.invalid])
    })
  })
})
