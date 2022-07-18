const assert = require('assert').strict
const axios = require('axios')
const { cpf } = require('cpf-cnpj-validator')

const { MongoConnection } = require('../../../src/repository')
const { _findOne, _deleteOne, _insertOne } = require('../../util/mongo-actions')

describe('Integration test for UserController', function () {
  let connection = {}

  before(async function () {
    connection = await MongoConnection.getConnection()
  })

  describe('get', function () {
    it('should return 200 when success', async function () {
      const options = {
        method: 'get',
        params: {
          isBlocked: false,
          limit: 2,
          userName: 'Senhor Stark'
        },
        url: `${process.env.SERVICE_API_URL}/users`
      }

      let response = {}
      await assert.doesNotReject(async () => {
        response = await axios(options)
      })

      const userSelected = await _findOne(connection, { name: options.params.userName })

      assert.notEqual(response.data.items, null)
      assert.equal(response.data.items[0]._id.toString(), userSelected._id.toString())
    })
  })

  describe('post', function () {
    it('should return 200 when success', async function () {
      const options = {
        data: {
          blocked: false,
          document: cpf.generate(),
          userName: 'Foo'
        },
        method: 'post',
        url: `${process.env.SERVICE_API_URL}/users`
      }

      let response = {}
      await assert.doesNotReject(async () => {
        response = await axios(options)
      })

      const insertedUser = await _findOne(connection, { document: options.data.document })

      assert.notEqual(response.data, null)
      assert.equal(response.data.id, insertedUser._id.toString())

      await _deleteOne(connection, response.data.id)
    })
  })

  describe('delete', function () {
    it('should return 200 when success', async function () {
      const testUser = {
        blocked: false,
        document: cpf.generate(),
        name: 'Foo',
        order: 4
      }

      const { insertedId } = await _insertOne(connection, testUser)

      const options = {
        method: 'delete',
        url: `${process.env.SERVICE_API_URL}/users/${insertedId.toString()}`
      }

      let response = {}
      await assert.doesNotReject(async () => {
        response = await axios(options)
      })

      const userNoMore = await _findOne(connection, { _id: insertedId.toString() })

      assert.notEqual(response.data.userDeleted, null)
      assert.equal(response.data.userDeleted, insertedId.toString())
      assert.equal(userNoMore, null)
    })
  })
})
