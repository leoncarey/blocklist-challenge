const assert = require('assert').strict

const { MongoRepository } = require('../../../src/repository')

describe('Mongo Repository integration tests', function () {
  const req = {}
  const res = {}

  before(async function () {
    await MongoRepository.createConnectionMiddleware(req, res, () => true)
  })

  it('should not return error on ping', async function () {
    const ping = await MongoRepository.ping()
    assert(ping)
  })

  it('should not return error on findMany', async function () {
    const parameters = {
      document: '67470813071',
      isBlocked: false,
      limit: 2
    }

    const response = await MongoRepository.findMany(parameters)

    assert.notEqual(response, [])
    assert(response.length !== 0)
  })
})
