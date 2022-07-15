const { Healthz } = require('../../../src/controllers')
const GatewayUnavailableError = require('../../../src/exceptions/gateway-unavailable-error')
const { logger } = require('../../../src/helpers')
const { MongoRepository } = require('../../../src/repository')

const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

describe('Test integration for Healthz', function () {
  let req = {}
  let res = {}

  before(function () {
    [res, req] = getFakeResAndReq()
  })

  beforeEach(function () {
    sandbox.stub(MongoRepository, 'ping').returns(true)
    sandbox.spy(res)
    sandbox.spy(logger)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(Healthz.get(req, res))
    assert.ok(MongoRepository.ping.calledOnce)
    assert.ok(res.end.calledOnce)
  })

  it('should return error if Mongo is unavailable', async function () {
    MongoRepository.ping.restore()
    sandbox.stub(MongoRepository, 'ping').throws(new GatewayUnavailableError('Error'))

    await assert.rejects(Healthz.get(req, res), GatewayUnavailableError)
    assert.ok(MongoRepository.ping.calledOnce)
    assert.ok(res.end.notCalled)
    assert.ok(logger.error.calledOnce)
  })
})

const getFakeResAndReq = () => {
  const req = {}
  const res = {
    end: () => true
  }

  return [res, req]
}
