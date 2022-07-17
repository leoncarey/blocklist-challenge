const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')

const { MongoRepository, MongoConnection } = require('../../../src/repository')

const collection = 'testCollection'

describe('Mongo Repository integration tests', function () {
  let connection = {}
  let repository = {}

  before(async function () {
    connection = await MongoConnection.getConnection()
    repository = MongoRepository.setRepository(connection)
  })

  it('should not return error on ping', async function () {
    const ping = await repository.ping()
    assert(ping.ok)
  })

  it('should not return error on findWithPagination', async function () {
    const parameters = {
      document: '67470813071',
      isBlocked: false,
      limit: 2
    }

    const response = await repository.findWithPagination(parameters, collection)

    assert.notEqual(response, null)
    assert(response.total !== 0)
  })

  it('should insert a new user and returns it with insertOne and findOne', async function () {
    const newUser = {
      blocked: false,
      document: cpf.generate(),
      name: 'Morgan Stark'
    }

    const insertedId = await repository.insertOne(newUser, collection)
    const insertedUser = await repository.findOne({ document: newUser.document }, collection)

    assert.notEqual(insertedId, null)
    assert.equal(insertedId.toString(), insertedUser._id.toString())
  })
})
