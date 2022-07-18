const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')

const { PostUserParameters } = require('../../../../src/parameters')
const { validationErrors } = require('../../../../src/constants')

describe('Unit tests for PostUserParameters', function () {
  const req = {}

  beforeEach(function () {
    req.body = {
      blocked: false,
      document: cpf.generate(),
      userName: 'Morgan Stark'
    }
  })

  it('should not return error', function () {
    const parameters = PostUserParameters.processParameters(req)
    assert(parameters.errors.length === 0)
  })

  describe('Tests for userName', function () {
    it('should return invalid error with userName invalid', function () {
      req.body.userName = 854113
      const parameters = PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.userName.invalid])
    })

    it('should return required error without userName', function () {
      delete req.body.userName
      const parameters = PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.userName.required])
    })
  })

  describe('Tests for document', function () {
    it('should return invalid error with document invalid', function () {
      req.body.document = 854113
      const parameters = PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })

    it('should return invalid error if CNPJ document is so big', function () {
      req.body.document = '111111111111111111111111111'
      const parameters = PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })

    it('should return required error without document', function () {
      delete req.body.document
      const parameters = PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.required])
    })
  })

  describe('Tests for blocked', function () {
    it('should return invalid error with blocked invalid', function () {
      req.body.blocked = 854113
      const parameters = PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.isBlocked.invalid])
    })

    it('should return required error without blocked', function () {
      delete req.body.blocked
      const parameters = PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.isBlocked.required])
    })
  })
})
