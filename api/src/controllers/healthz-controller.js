const { ServiceUnavailableError } = require('../exceptions')
const MetricsTool = require('../middleware/metrics-tool')
class HealthzController {
  static async get (req, res) {
    try {
      // Metrics ===
      const healthzMetrics = MetricsTool.createCounter({
        help: 'Total number of ping on helthz',
        labelNames: ['helth_application'],
        name: 'healthz_check'
      })

      healthzMetrics.inc(1)
      // ===

      await req.mongo.ping()
      return res.end()
    } catch (error) {
      throw new ServiceUnavailableError(error)
    }
  }
}

module.exports = HealthzController
