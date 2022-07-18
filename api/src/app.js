const compression = require('compression')
const express = require('express')

const { MongoMiddleware } = require('./repository')

const routes = require('./routes')

const app = express()

app.use(compression())
app.use(express.json())

app.use(MongoMiddleware.setMongoApplication)

app.use(routes)

module.exports = app
