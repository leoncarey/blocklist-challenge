const { HealthzController } = require('../../../src/controllers')
const { ServiceUnavailableError } = require('../../../src/exceptions')
const { MetricsTool } = require('../../../src/middleware')
const getFakeResAndReq = require('../../util/user-fake-request')

const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

describe('Unit tests for Healthz', function () {
  let req = {}
  let res = {}

  before(function () {
    [res, req] = getFakeResAndReq()
  })

  beforeEach(function () {
    sandbox.stub(MetricsTool, 'createCounter').returns({
      inc: () => true
    })
    sandbox.spy(req.mongo)
    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should not return error', async function () {
    await assert.doesNotReject(HealthzController.get(req, res))
    assert(MetricsTool.createCounter.calledOnce)
    assert(req.mongo.ping.calledOnce)
    assert(res.end.calledOnce)
  })

  it('should return error if Metrics has some error', async function () {
    MetricsTool.createCounter.restore()
    sandbox.stub(MetricsTool, 'createCounter').throws(new Error('Error on Metrics'))

    await assert.rejects(HealthzController.get(req, res), Error)
    assert(MetricsTool.createCounter.calledOnce)
    assert(req.mongo.ping.notCalled)
  })

  it('should return error if Mongo is unavailable', async function () {
    req.mongo.ping.restore()
    sandbox.stub(req.mongo, 'ping').throws(new ServiceUnavailableError())

    await assert.rejects(HealthzController.get(req, res), ServiceUnavailableError)
    assert(MetricsTool.createCounter.calledOnce)
    assert(req.mongo.ping.calledOnce)
    assert(res.end.notCalled)
  })
})
