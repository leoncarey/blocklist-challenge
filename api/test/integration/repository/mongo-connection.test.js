const assert = require('assert').strict

const { MongoConnection } = require('../../../src/repository')

describe('Integration tests for MongoConnection', function () {
  it('should connect with mongodb', async function () {
    const connection = await MongoConnection.getConnection()
    assert(connection)
  })
})
