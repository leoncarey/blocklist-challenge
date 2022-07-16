const assert = require('assert').strict
const chai = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')

const { MongoMiddleware } = require('../../../src/repository')

chai.use(chaiHttp)

describe('Integration tests for MongoMiddleware', function () {
  it('should inject mongo at the request', async function () {
    const route = '/'
    const app = express()
    app.use(MongoMiddleware.setMongoApplication)

    app.get(route, (req, res) => {
      res.send('Rélou mai frendi!')
      assert(req.mongo)
    })

    const response = await chai.request(app).get(route)
    assert.equal(response.statusCode, 200)
  })
})
