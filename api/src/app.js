const express = require('express')
const compression = require('compression')
const cors = require('cors')

const { MongoMiddleware } = require('./repository')
const { MetricsTool } = require('./middleware')

const routes = require('./routes')
const app = express()

app.use(compression())
app.use(express.json())
app.use(cors())

app.use(MongoMiddleware.setMongoApplication)
app.use(MetricsTool.configureHistogram)

app.use(routes)

module.exports = app
