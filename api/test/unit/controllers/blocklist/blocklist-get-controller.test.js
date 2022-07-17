const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

const { cpf } = require('cpf-cnpj-validator')
const validationErrorsConstants = require('../../../../src/constants/validation-errors-constants')
const BlocklistController = require('../../../../src/controllers/blocklist-controller')
const { ValidationError, ServiceUnavailableError } = require('../../../../src/exceptions')
const { GetBlocklistParameters } = require('../../../../src/parameters')
const getFakeResAndReq = require('../../../util/blocklist-fake-request')

describe('Unit tests for BlocklistController.get', function () {
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

    sandbox.stub(GetBlocklistParameters, 'processParameters').returns(fakeParameters)
    sandbox.stub(req.mongo, 'findWithPagination').returns(fakeUsersReturn)

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(BlocklistController.get(req, res))

    assert(GetBlocklistParameters.processParameters.calledOnce)
    assert(req.mongo.findWithPagination.calledOnce)
    assert(res.status.calledOnce)
  })

  it('should return error if has validation error', async function () {
    GetBlocklistParameters.processParameters.restore()
    sandbox.stub(GetBlocklistParameters, 'processParameters').returns({
      errors: [validationErrorsConstants.document.invalid]
    })

    await assert.rejects(BlocklistController.get(req, res), ValidationError)

    assert(GetBlocklistParameters.processParameters.calledOnce)
    assert(req.mongo.findWithPagination.notCalled)
  })

  it('should return error if repository has error', async function () {
    req.mongo.findWithPagination.restore()
    sandbox.stub(req.mongo, 'findWithPagination').throws(new ServiceUnavailableError())

    await assert.rejects(BlocklistController.get(req, res), ServiceUnavailableError)

    assert(GetBlocklistParameters.processParameters.calledOnce)
    assert(req.mongo.findWithPagination.calledOnce)
    assert(res.status.notCalled)
  })
})
