const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

const { cpf } = require('cpf-cnpj-validator')
const validationErrorsConstants = require('../../../src/constants/validation-errors-constants')
const BlocklistController = require('../../../src/controllers/blocklist-controller')
const { ValidationError, ServiceUnavailableError } = require('../../../src/exceptions')
const { GetBlocklistParameters } = require('../../../src/parameters')
const { MongoRepository } = require('../../../src/repository')

describe('Unit tests for BlocklistController', function () {
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
    sandbox.stub(MongoRepository, 'findMany').returns(fakeUsersReturn)

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('get', function () {
    it('should not return error', async function () {
      await assert.doesNotReject(BlocklistController.get(req, res))

      assert(GetBlocklistParameters.processParameters.calledOnce)
      assert(MongoRepository.findMany.calledOnce)
      assert(res.status.calledOnce)
    })

    it('should return error if has validation error', async function () {
      GetBlocklistParameters.processParameters.restore()
      sandbox.stub(GetBlocklistParameters, 'processParameters').returns({
        errors: [validationErrorsConstants.document.invalid]
      })

      await assert.rejects(BlocklistController.get(req, res), ValidationError)

      assert(GetBlocklistParameters.processParameters.calledOnce)
      assert(MongoRepository.findMany.notCalled)
    })

    it('should return error if MongoRepository has error', async function () {
      MongoRepository.findMany.restore()
      sandbox.stub(MongoRepository, 'findMany').throws(new ServiceUnavailableError())

      await assert.rejects(BlocklistController.get(req, res), ServiceUnavailableError)

      assert(GetBlocklistParameters.processParameters.calledOnce)
      assert(MongoRepository.findMany.calledOnce)
      assert(res.status.notCalled)
    })
  })
})

const getFakeResAndReq = () => {
  const req = {}
  const res = {
    status: () => ({
      send: () => true
    })
  }

  return [res, req]
}
