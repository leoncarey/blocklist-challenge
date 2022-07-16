const { HealthzController } = require('../../../src/controllers')
const { ServiceUnavailableError } = require('../../../src/exceptions')
const { logger } = require('../../../src/helpers')

const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

describe('Test integration for Healthz', function () {
  let req = {}
  let res = {}

  before(function () {
    [res, req] = getFakeResAndReq()
  })

  beforeEach(function () {
    sandbox.spy(req.mongo)
    sandbox.spy(res)
    sandbox.spy(logger)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(HealthzController.get(req, res))
    assert(req.mongo.ping.calledOnce)
    assert(res.end.calledOnce)
  })

  it('should return error if Mongo is unavailable', async function () {
    req.mongo.ping.restore()
    sandbox.stub(req.mongo, 'ping').throws(new ServiceUnavailableError())

    await assert.rejects(HealthzController.get(req, res), ServiceUnavailableError)
    assert(req.mongo.ping.calledOnce)
    assert(res.end.notCalled)
    assert(logger.error.calledOnce)
  })
})

const getFakeResAndReq = () => {
  const req = {
    mongo: {
      ping: () => true
    }
  }
  const res = {
    end: () => true
  }

  return [res, req]
}
