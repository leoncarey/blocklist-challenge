const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()
const { ObjectId } = require('mongodb')

const validationErrorsConstants = require('../../../../src/constants/validation-errors-constants')
const { UserController } = require('../../../../src/controllers')
const { ValidationError } = require('../../../../src/exceptions')
const { UpdateUserParameters } = require('../../../../src/parameters')
const getFakeResAndReq = require('../../../util/user-fake-request')

describe('Unit tests for UserController.update', function () {
  let req = {}
  let res = {}
  let fakeParameters = {}

  before(function () {
    [res, req] = getFakeResAndReq()
  })

  beforeEach(function () {
    fakeParameters = {
      blocked: false,
      errors: [],
      userId: (new ObjectId()).toString()
    }

    sandbox.stub(UpdateUserParameters, 'processParameters').returns(fakeParameters)
    sandbox.stub(req.mongo, 'updateOne').returns(new ObjectId())

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(UserController.update(req, res))

    assert(UpdateUserParameters.processParameters.calledOnce)
    assert(req.mongo.updateOne.calledOnce)
    assert(res.status.calledOnce)
  })

  it('should return error if has validation error', async function () {
    UpdateUserParameters.processParameters.restore()
    sandbox.stub(UpdateUserParameters, 'processParameters').returns({
      errors: [validationErrorsConstants.document.invalid]
    })

    await assert.rejects(UserController.update(req, res), ValidationError)

    assert(UpdateUserParameters.processParameters.calledOnce)
    assert(req.mongo.updateOne.notCalled)
  })
})
