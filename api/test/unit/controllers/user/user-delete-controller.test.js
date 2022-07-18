const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

const { validationErrors } = require('../../../../src/constants')
const { UserController } = require('../../../../src/controllers')
const { ValidationError, NotFoundError } = require('../../../../src/exceptions')
const { DeleteUserParameters } = require('../../../../src/parameters')
const getFakeResAndReq = require('../../../util/user-fake-request')

describe('Unit tests for UserController.get', function () {
  let req = {}
  let res = {}
  let fakeParameters = {}

  before(function () {
    [res, req] = getFakeResAndReq()
  })

  beforeEach(function () {
    fakeParameters = {
      errors: []
    }

    sandbox.stub(DeleteUserParameters, 'processParameters').returns(fakeParameters)
    sandbox.stub(req.mongo, 'deleteById').returns(true)

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(UserController.delete(req, res))

    assert(DeleteUserParameters.processParameters.calledOnce)
    assert(req.mongo.deleteById.calledOnce)
    assert(res.status.calledOnce)
  })

  it('should return error if has validation error', async function () {
    DeleteUserParameters.processParameters.restore()
    sandbox.stub(DeleteUserParameters, 'processParameters').returns({
      errors: [validationErrors.userId.notFound]
    })
    await assert.rejects(UserController.delete(req, res), ValidationError)

    assert(DeleteUserParameters.processParameters.calledOnce)
    assert(req.mongo.deleteById.notCalled)
  })

  it('should return validation error if repository was not able delete user', async function () {
    req.mongo.deleteById.restore()
    sandbox.stub(req.mongo, 'deleteById').returns(false)

    await assert.rejects(UserController.delete(req, res), NotFoundError)

    assert(DeleteUserParameters.processParameters.calledOnce)
    assert(req.mongo.deleteById.calledOnce)
    assert(res.status.notCalled)
  })
})
