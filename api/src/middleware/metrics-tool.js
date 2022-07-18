const Prometheus = require('prom-client')

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  // Buckets for response time from 0.1ms to 500ms
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  name: 'http_request_duration_ms'
})

class MetricsTool {
  static configureHistogram (req, res, next) {
    const responseTimeInMs = res.locals.startEpoch ? Date.now() - res.locals.startEpoch : Date.now()

    httpRequestDurationMicroseconds
      .labels(req.method, req.path, res.statusCode)
      .observe(responseTimeInMs)

    next()
  }

  static collectMetrics () {
    return Prometheus.collectDefaultMetrics()
  }

  static async status (req, res) {
    res.set('Content-Type', Prometheus.register.contentType)

    const metrics = await Prometheus.register.metrics()
    res.end(metrics)
  }

  static createCounter (dataMetric) {
    return new Prometheus.Counter(dataMetric)
  }
}

module.exports = MetricsTool
