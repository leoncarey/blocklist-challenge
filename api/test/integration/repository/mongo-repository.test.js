const { MongoClient } = require('mongodb')
const { MongoRepository } = require('../../../src/repository')

const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

describe('Mongo Repository integration tests', function () {
  beforeEach(function () {
    sandbox.spy(MongoRepository)
    sandbox.spy(MongoClient.connect)
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('getDatabase', function () {
    it('should not return error', async function () {
      await MongoRepository.getDatabase()
    })
  })
})
