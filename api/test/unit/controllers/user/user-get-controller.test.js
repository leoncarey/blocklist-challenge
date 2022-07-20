const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

const { cpf } = require('cpf-cnpj-validator')
const { ObjectId } = require('mongodb')
const validationErrorsConstants = require('../../../../src/constants/validation-errors-constants')
const { UserController } = require('../../../../src/controllers')
const { ValidationError, ServiceUnavailableError } = require('../../../../src/exceptions')
const { GetUserParameters } = require('../../../../src/parameters')
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

    const fakeUsersReturn = {
      items: [
        {
          _id: new ObjectId(),
          blocked: false,
          document: cpf.generate(),
          documentType: 'CPF',
          name: 'Foo',
          order: 1
        }
      ],
      totalCount: 1
    }

    sandbox.stub(GetUserParameters, 'processParameters').returns(fakeParameters)
    sandbox.stub(req.mongo, 'findWithPagination').returns(fakeUsersReturn)

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(UserController.get(req, res))

    assert(GetUserParameters.processParameters.calledOnce)
    assert(req.mongo.findWithPagination.calledOnce)
    assert(res.status.calledOnce)
  })

  it('should return error if has validation error', async function () {
    GetUserParameters.processParameters.restore()
    sandbox.stub(GetUserParameters, 'processParameters').returns({
      errors: [validationErrorsConstants.document.invalid]
    })

    await assert.rejects(UserController.get(req, res), ValidationError)

    assert(GetUserParameters.processParameters.calledOnce)
    assert(req.mongo.findWithPagination.notCalled)
  })

  it('should return error if repository has error', async function () {
    req.mongo.findWithPagination.restore()
    sandbox.stub(req.mongo, 'findWithPagination').throws(new ServiceUnavailableError())

    await assert.rejects(UserController.get(req, res), ServiceUnavailableError)

    assert(GetUserParameters.processParameters.calledOnce)
    assert(req.mongo.findWithPagination.calledOnce)
    assert(res.status.notCalled)
  })
})
