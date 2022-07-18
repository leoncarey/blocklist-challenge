const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()
const Prometheus = require('prom-client')

const { MetricsTool } = require('../../../src/middleware')
const getFakeResAndReq = require('../../util/user-fake-request')

describe('Unit tests for Metrics Tool', function () {
  let req = {}
  let res = {}

  beforeEach(function () {
    [res, req] = getFakeResAndReq()

    sandbox.spy(res)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should call Prometheus.collectDefaultMetrics on collectMetricts', function () {
    sandbox.stub(Prometheus, 'collectDefaultMetrics').returns(true)
    MetricsTool.collectMetrics()

    assert(Prometheus.collectDefaultMetrics.calledOnce)
  })

  it('should call Prometheus.register on status endpoint', async function () {
    await MetricsTool.status(req, res)

    assert(res.set.calledOnce)
    assert(res.end.calledOnce)
  })
})
