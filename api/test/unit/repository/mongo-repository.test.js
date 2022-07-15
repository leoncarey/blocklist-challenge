const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

const { default: mongoose } = require('mongoose')
const { MongoRepository } = require('../../../src/repository')

describe('Mongo Repository integration tests', function () {
  describe('Tests for createConnectionMiddleware', function () {
    const req = {}
    const res = {}
    let nextCalled = false

    beforeEach(function () {
      sandbox.stub(mongoose, 'connect').returns(true)
    })

    afterEach(function () {
      sandbox.restore()
      nextCalled = false
    })

    it('should not return error', function () {
      MongoRepository.createConnectionMiddleware(req, res, () => {
        nextCalled = true
      })

      assert(mongoose.connect.calledOnce)
      assert(nextCalled)
    })

    it('should return error if mongoose not connect', function () {
      mongoose.connect.restore()
      sandbox.stub(mongoose, 'connect').throws(Error('Generic Mongo error'))

      try {
        assert.rejects(
          MongoRepository.createConnectionMiddleware(req, res, () => {
            nextCalled = true
          }),
          Error
        )
      } catch (error) {
        assert(mongoose.connect.calledOnce)
        assert(!nextCalled)
      }
    })
  })
})
