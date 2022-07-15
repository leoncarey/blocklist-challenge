const compression = require('compression')
const express = require('express')

const { MongoRepository } = require('./repository')

const routes = require('./routes')
const app = express()

app.use(compression())
app.use(express.json())

app.use(MongoRepository.createConnectionMiddleware)
app.use(routes)

module.exports = app
