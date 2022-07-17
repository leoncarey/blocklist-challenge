const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')
const { mongoConfig } = require('../../../src/constants')

const { MongoRepository, MongoConnection } = require('../../../src/repository')

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

  describe('Tests for findWithPagination', function () {
    it('should not return error on findWithPagination', async function () {
      const parameters = {
        document: '67470813071',
        isBlocked: false,
        limit: 2
      }

      const response = await repository.findWithPagination(parameters, mongoConfig.COLLECTION)

      assert.notEqual(response, null)
      assert(response.total !== 0)
    })
  })

  it('should insert a new user, find this user and delete with insertOne, findOne and deleteById', async function () {
    const newUser = {
      blocked: false,
      document: cpf.generate(),
      name: 'Morgan Stark'
    }

    const insertedId = await repository.insertOne(newUser, mongoConfig.COLLECTION)
    const insertedUser = await repository.findOne({ document: newUser.document }, mongoConfig.COLLECTION)

    assert.notEqual(insertedId, null)
    assert.equal(insertedId.toString(), insertedUser._id.toString())

    const userDeleted = await repository.deleteById(insertedId, mongoConfig.COLLECTION)
    assert(userDeleted)
  })

  it('should return last order sequence', async function () {
    const newUser = {
      blocked: false,
      document: cpf.generate(),
      name: 'Star Lord',
      order: 4
    }

    const insertedId = await repository.insertOne(newUser, mongoConfig.COLLECTION)

    const insertedUser = await repository.findOne({ _id: insertedId }, mongoConfig.COLLECTION)
    const lastNextOrder = await repository.getLastNextOrderSequence(mongoConfig.COLLECTION)

    assert.notEqual(lastNextOrder, null)
    assert.equal(insertedUser.order + 1, lastNextOrder)
  })
})
