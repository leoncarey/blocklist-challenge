const assert = require('assert').strict

const { ObjectId } = require('mongodb')
const { UpdateUserParameters } = require('../../../../src/parameters')
const { validationErrors } = require('../../../../src/constants')

describe('Unit tests for UpdateUserParameters', function () {
  let req = {}

  beforeEach(function () {
    const userId = new ObjectId()

    req = {
      body: {
        blocked: false
      },
      mongo: {
        findOne: () => ({ _id: userId })
      },
      params: {
        userId: (userId).toString()
      }
    }
  })

  it('should not return error', async function () {
    const parameters = await UpdateUserParameters.processParameters(req)
    assert(parameters.errors.length === 0)
  })

  it('should return invalid error with userId invalid', async function () {
    req.params.userId = true
    const parameters = await UpdateUserParameters.processParameters(req)
    assert.deepEqual(parameters.errors, [validationErrors.userId.invalid])
  })

  it('should return invalid error when userId not exists', async function () {
    req.mongo.findOne = () => (null)

    const parameters = await UpdateUserParameters.processParameters(req)
    assert.deepEqual(parameters.errors, [validationErrors.userId.invalid])
  })

  it('should return invalid error with blocked invalid', async function () {
    req.body.blocked = 854113
    const parameters = await UpdateUserParameters.processParameters(req)
    assert.deepEqual(parameters.errors, [validationErrors.isBlocked.invalid])
  })
})
