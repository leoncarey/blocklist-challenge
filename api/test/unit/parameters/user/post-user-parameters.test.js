const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')

const { PostUserParameters } = require('../../../../src/parameters')
const { validationErrors } = require('../../../../src/constants')

describe('Unit tests for PostUserParameters', function () {
  let req = {}

  beforeEach(function () {
    req = {
      body: {
        blocked: false,
        document: cpf.generate(),
        userName: 'Morgan Stark'
      },
      mongo: {
        findOne: () => null
      }
    }
  })

  it('should not return error', async function () {
    const parameters = await PostUserParameters.processParameters(req)
    assert(parameters.errors.length === 0)
  })

  describe('Tests for userName', function () {
    it('should return invalid error with userName invalid', async function () {
      req.body.userName = 854113
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.userName.invalid])
    })

    it('should return required error without userName', async function () {
      delete req.body.userName
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.userName.required])
    })
  })

  describe('Tests for document', function () {
    it('should return invalid error with document invalid', async function () {
      req.body.document = 854113
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })

    it('should return invalid error if CNPJ document is so big', async function () {
      req.body.document = '111111111111111111111111111'
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.invalid])
    })

    it('should return required error without document', async function () {
      delete req.body.document
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.required])
    })

    it('should return required if document already exists', async function () {
      req.mongo.findOne = () => ({ document: '12312312345' })
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.document.already])
    })
  })

  describe('Tests for blocked', function () {
    it('should return invalid error with blocked invalid', async function () {
      req.body.blocked = 854113
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.isBlocked.invalid])
    })

    it('should return required error without blocked', async function () {
      delete req.body.blocked
      const parameters = await PostUserParameters.processParameters(req)
      assert.deepEqual(parameters.errors, [validationErrors.isBlocked.required])
    })
  })
})
