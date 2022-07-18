const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()
const { ObjectId } = require('mongodb')

const { cpf } = require('cpf-cnpj-validator')
const validationErrorsConstants = require('../../../../src/constants/validation-errors-constants')
const { UserController } = require('../../../../src/controllers')
const { ValidationError, ServiceUnavailableError } = require('../../../../src/exceptions')
const { PostUserParameters } = require('../../../../src/parameters')
const getFakeResAndReq = require('../../../util/user-fake-request')

describe('Unit tests for UserController.post', function () {
  let req = {}
  let res = {}
  let fakeParameters = {}

  before(function () {
    [res, req] = getFakeResAndReq()
  })

  beforeEach(function () {
    fakeParameters = {
      blocked: false,
      document: cpf.generate(),
      errors: [],
      name: 'Foo',
      order: 1
    }

    sandbox.stub(PostUserParameters, 'processParameters').returns(fakeParameters)
    sandbox.stub(req.mongo, 'getLastNextOrderSequence').returns(2)
    sandbox.stub(req.mongo, 'insertOne').returns(new ObjectId())

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(UserController.post(req, res))

    assert(PostUserParameters.processParameters.calledOnce)
    assert(req.mongo.getLastNextOrderSequence.calledOnce)
    assert(req.mongo.insertOne.calledOnce)
    assert(res.status.calledOnce)
  })

  it('should return error if has validation error', async function () {
    PostUserParameters.processParameters.restore()
    sandbox.stub(PostUserParameters, 'processParameters').returns({
      errors: [validationErrorsConstants.document.invalid]
    })

    await assert.rejects(UserController.post(req, res), ValidationError)

    assert(PostUserParameters.processParameters.calledOnce)
    assert(req.mongo.getLastNextOrderSequence.notCalled)
  })

  it('should return error if mongo repository getLastNextOrderSequence has error', async function () {
    req.mongo.getLastNextOrderSequence.restore()
    sandbox.stub(req.mongo, 'getLastNextOrderSequence').throws(new ServiceUnavailableError())

    await assert.rejects(UserController.post(req, res), ServiceUnavailableError)

    assert(PostUserParameters.processParameters.calledOnce)
    assert(req.mongo.getLastNextOrderSequence.calledOnce)
    assert(req.mongo.insertOne.notCalled)
  })

  it('should return error if mongo repository insertOne has error', async function () {
    req.mongo.insertOne.restore()
    sandbox.stub(req.mongo, 'insertOne').throws(new ServiceUnavailableError())

    await assert.rejects(UserController.post(req, res), ServiceUnavailableError)

    assert(PostUserParameters.processParameters.calledOnce)
    assert(req.mongo.getLastNextOrderSequence.calledOnce)
    assert(req.mongo.insertOne.calledOnce)
    assert(res.status.notCalled)
  })
})
