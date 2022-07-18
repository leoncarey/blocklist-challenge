const assert = require('assert').strict
const { ObjectId } = require('mongodb')

const { DeleteUserParameters } = require('../../../../src/parameters')
const { validationErrors } = require('../../../../src/constants')

describe('Unit tests for DeleteParameters', function () {
  const req = {}

  beforeEach(function () {
    req.params = {
      userId: new ObjectId()
    }
  })

  it('should not return errors with all valid parameters', function () {
    const parameters = DeleteUserParameters.processParameters(req)
    assert(parameters.errors.length === 0)
  })

  it('should return required error without userId', function () {
    delete req.params.userId
    const parameters = DeleteUserParameters.processParameters(req)
    assert.deepEqual(parameters.errors, [validationErrors.userId.required])
  })

  it('should return invalid error with userId invalid', function () {
    req.params.userId = true
    const parameters = DeleteUserParameters.processParameters(req)

    assert.deepEqual(parameters.errors, [validationErrors.userId.invalid])
  })
})
