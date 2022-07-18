const assert = require('assert').strict
const chai = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')

const { RouterTool } = require('../../../src/middleware')

chai.use(chaiHttp)

describe('Unit tests for router tool', function () {
  const ROUTE = '/test'
  let app = null
  let router = null

  beforeEach(function () {
    app = express()
    router = express.Router()
  })

  describe('create route', function () {
    it('should create GET route', async function () {
      RouterTool.create(router, 'GET', ROUTE, _controller)
      app.use(router)

      const response = await chai.request(app)
        .get(ROUTE)

      assert.equal(200, response.status)
    })

    it('should create POST route', async function () {
      RouterTool.create(router, 'POST', ROUTE, _controller)
      app.use(router)

      const response = await chai.request(app)
        .post(ROUTE)

      assert.equal(200, response.status)
    })

    it('should create should create PUT route', async function () {
      RouterTool.create(router, 'PUT', ROUTE, _controller)
      app.use(router)

      const response = await chai.request(app)
        .put(ROUTE)

      assert.equal(200, response.status)
    })

    it('should create PATCH route', async function () {
      RouterTool.create(router, 'PATCH', ROUTE, _controller)
      app.use(router)

      const response = await chai.request(app)
        .patch(ROUTE)

      assert.equal(200, response.status)
    })

    it('should create DELETE route', async function () {
      RouterTool.create(router, 'DELETE', ROUTE, _controller)
      app.use(router)

      const response = await chai.request(app)
        .delete(ROUTE)

      assert.equal(200, response.status)
    })

    const _controller = (_req, response) => response.end()
  })
})
