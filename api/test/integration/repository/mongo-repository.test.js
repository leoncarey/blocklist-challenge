const assert = require('assert').strict
const { cpf } = require('cpf-cnpj-validator')

const { MongoRepository, MongoConnection } = require('../../../src/repository')
const { _insertMany, _deleteMany, _insertOne, _findOne, _findMany } = require('../../util/mongo-actions')
const { mongoConfig } = require('../../../src/constants')
const { ObjectID } = require('bson')

const newUsersList = [
  {
    blocked: true,
    document: cpf.generate(),
    name: 'New User'
  },
  {
    blocked: true,
    document: cpf.generate(),
    name: 'New User'
  }
]

describe('Mongo Repository integration tests', function () {
  let connection = {}
  let repository = {}
  let filter = {}

  before(async function () {
    connection = await MongoConnection.getConnection()
    repository = MongoRepository.setRepository(connection)
  })

  beforeEach(function () {
    filter = {
      isBlocked: true,
      limit: 2,
      userName: 'New User'
    }
  })

  afterEach(async function () {
    await _deleteMany(connection, { name: filter.userName })
  })

  it('should not return error on ping', async function () {
    const ping = await repository.ping()
    assert(ping.ok)
  })

  it('should return list users with findWithPagination based on user name', async function () {
    await _insertMany(connection, newUsersList)

    const { totalCount } = await repository.findWithPagination(filter, mongoConfig.COLLECTION)

    assert.notEqual(totalCount, null)
    assert.equal(totalCount, 2)
  })

  it('should return list users with findWithPagination based on user document', async function () {
    await _insertOne(connection, newUsersList[0])
    delete filter.name
    filter.document = newUsersList[0].document

    const { totalCount } = await repository.findWithPagination(filter, mongoConfig.COLLECTION)

    assert.notEqual(totalCount, null)
    assert.equal(totalCount, 1)
  })

  it('should delete user with deleteById', async function () {
    const { insertedId } = await _insertOne(connection, newUsersList[0])

    const userDeleted = await repository.deleteById(insertedId, mongoConfig.COLLECTION)
    assert(userDeleted)

    const userNoMore = await _findOne(connection, { name: newUsersList[0].name })
    assert.equal(userNoMore, null)
  })

  it('should insert user with insertOne', async function () {
    const insertedId = await repository.insertOne(newUsersList[0], mongoConfig.COLLECTION)
    const insertedUser = await _findOne(connection, { document: newUsersList[0].document })

    assert.notEqual(insertedId, null)
    assert.equal(insertedId.toString(), insertedUser._id.toString())
  })

  it('should return last order sequence', async function () {
    const newUser = {
      ...newUsersList[0],
      order: 4
    }

    const { insertedId } = await _insertOne(connection, newUser)

    const insertedUser = await _findOne(connection, { _id: insertedId })
    const lastNextOrder = await repository.getLastNextOrderSequence(mongoConfig.COLLECTION)

    assert.notEqual(lastNextOrder, null)
    assert.equal(insertedUser.order + 1, lastNextOrder)
  })

  it('should insert many users with insertMany', async function () {
    const { insertedIds, insertedCount } = await repository.insertMany(newUsersList, mongoConfig.COLLECTION)
    const items = await _findMany(connection, { name: newUsersList[0].name }, { limit: 3 })

    assert.notEqual(insertedIds, null)
    assert.equal(insertedCount, items.length)
  })

  it('should update many users with updateMany', async function () {
    const { insertedIds } = await _insertMany(connection, newUsersList)
    const updateUsersList = []

    const newName = 'Zé'

    for (const userId of Object.values(insertedIds)) {
      updateUsersList.push({
        _id: userId,
        name: newName
      })
    }

    const updatedUsersCount = await repository.updateMany(updateUsersList, mongoConfig.COLLECTION)
    assert.equal(updatedUsersCount, updateUsersList.length)

    const items = await _findMany(connection, { name: newName })
    assert.equal(updatedUsersCount, items.length)

    await _deleteMany(connection, { name: newName })
  })

  it('should delete many users with deleteMany', async function () {
    await _insertMany(connection, newUsersList)

    const areUsersDeleted = await repository.deleteMany({ name: newUsersList[0].name }, mongoConfig.COLLECTION)
    assert(areUsersDeleted)

    const usersNoMore = await _findMany(connection, { name: newUsersList[0].name })
    assert(usersNoMore.length === 0)
  })

  it('should update only user with updateOne', async function () {
    const { insertedId } = await _insertOne(connection, newUsersList[0])

    const newName = 'Zé'

    const { _id } = await repository.updateOne({ _id: new ObjectID(insertedId) }, { name: newName }, mongoConfig.COLLECTION)

    const { name } = await _findOne(connection, { _id })
    assert.equal(name, newName)

    await _deleteMany(connection, { name: newName })
  })
})
