const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

const { cpf } = require('cpf-cnpj-validator')
const validationErrorsConstants = require('../../../../src/constants/validation-errors-constants')
const BlocklistController = require('../../../../src/controllers/blocklist-controller')
const { ValidationError, ServiceUnavailableError } = require('../../../../src/exceptions')
const { PostBlocklistParameters } = require('../../../../src/parameters')
const getFakeResAndReq = require('../../../util/blocklist-fake-request')

describe('Unit tests for BlocklistController.post', function () {
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

    const fakeUsersReturn = [
      {
        blocked: false,
        document: cpf.generate(),
        documentType: 'CPF',
        name: 'Foo',
        order: 1
      }
    ]

    sandbox.stub(PostBlocklistParameters, 'processParameters').returns(fakeParameters)
    sandbox.stub(req.mongo, 'insertOne').returns(fakeUsersReturn)

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(BlocklistController.post(req, res))

    assert(PostBlocklistParameters.processParameters.calledOnce)
    assert(req.mongo.insertOne.calledOnce)
    assert(res.status.calledOnce)
  })

  it('should return error if has validation error', async function () {
    PostBlocklistParameters.processParameters.restore()
    sandbox.stub(PostBlocklistParameters, 'processParameters').returns({
      errors: [validationErrorsConstants.document.invalid]
    })

    await assert.rejects(BlocklistController.post(req, res), ValidationError)

    assert(PostBlocklistParameters.processParameters.calledOnce)
    assert(req.mongo.insertOne.notCalled)
  })

  it('should return error if repository has error', async function () {
    req.mongo.insertOne.restore()
    sandbox.stub(req.mongo, 'insertOne').throws(new ServiceUnavailableError())

    await assert.rejects(BlocklistController.post(req, res), ServiceUnavailableError)

    assert(PostBlocklistParameters.processParameters.calledOnce)
    assert(req.mongo.insertOne.calledOnce)
    assert(res.status.notCalled)
  })
})
