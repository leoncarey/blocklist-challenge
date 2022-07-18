const assert = require('assert').strict
const chai = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')

const { RouterTool } = require('../../../src/middleware')
const { BadRequestError, ServiceUnavailableError, UnauthorizedError, ValidationError, NotFoundError } = require('../../../src/exceptions')

chai.use(chaiHttp)

describe('Unit test for Error tools', function () {
  const ROUTE = '/test'
  let app = null
  let router = null

  beforeEach(function () {
    app = express()
    router = express.Router()
  })

  it('should return proper status code and message for BadRequestError', async function () {
    const _controller = (_req, _res) => {
      throw new BadRequestError()
    }

    RouterTool.create(router, 'GET', ROUTE, _controller)
    app.use(router)

    const response = await chai.request(app)
      .get(ROUTE)

    assert.equal(400, response.status)
    assert.equal('{"errorCode":"BAD_REQUEST","message":"Bad Request"}', response.text)
  })

  it('should return proper status code and message for UnauthorizedError', async function () {
    const _controller = (_req, _res) => {
      throw new UnauthorizedError()
    }

    RouterTool.create(router, 'GET', ROUTE, _controller)
    app.use(router)

    const response = await chai.request(app)
      .get(ROUTE)

    assert.equal(401, response.status)
    assert.equal('{"errorCode":"UNAUTHORIZED","message":"unauthorized"}', response.text)
  })

  it('should return proper status code and message for ServiceUnavailableError', async function () {
    const _controller = (_req, _res) => {
      throw new ServiceUnavailableError()
    }

    RouterTool.create(router, 'GET', ROUTE, _controller)
    app.use(router)

    const response = await chai.request(app)
      .get(ROUTE)

    assert.equal(503, response.status)
    assert.equal('{"errorCode":"SERVICE_UNAVAILABLE","message":"Service Unavailable"}', response.text)
  })

  it('should return proper status code and message for ValidationError', async function () {
    const _controller = (_req, _res) => {
      throw new ValidationError([])
    }

    RouterTool.create(router, 'GET', ROUTE, _controller)
    app.use(router)

    const response = await chai.request(app)
      .get(ROUTE)

    assert.equal(400, response.status)
    assert.equal('{"errorCode":"VALIDATION_ERROR","message":"Validation Error","errorDetail":[]}', response.text)
  })

  it('should return proper status code and message for NotFoundError', async function () {
    const _controller = (_req, _res) => {
      throw new NotFoundError([])
    }

    RouterTool.create(router, 'GET', ROUTE, _controller)
    app.use(router)

    const response = await chai.request(app)
      .get(ROUTE)

    assert.equal(404, response.status)
    assert.equal('{"errorCode":"NOT_FOUND","message":"Not Found","errorDetail":[]}', response.text)
  })

  it('should return proper status code and message for NotFoundError with details', async function () {
    const _controller = (_req, _res) => {
      throw new NotFoundError({ errorCode: 'FILE' })
    }

    RouterTool.create(router, 'GET', ROUTE, _controller)
    app.use(router)

    const response = await chai.request(app)
      .get(ROUTE)

    assert.equal(404, response.status)
    assert.equal('{"errorCode":"NOT_FOUND","message":"Not Found","errorDetail":{"errorCode":"FILE"}}', response.text)
  })

  it('should return 500 status code and internal server error message for not mapped errors', async function () {
    const _controller = (_req, _res) => {
      throw new Error('abc')
    }

    RouterTool.create(router, 'GET', ROUTE, _controller)
    app.use(router)

    const response = await chai.request(app)
      .get(ROUTE)

    assert.equal(500, response.status)
    assert.equal('{"errorCode":"INTERNAL_SERVER_ERROR","message":"Internal Server Error"}', response.text)
  })
})
