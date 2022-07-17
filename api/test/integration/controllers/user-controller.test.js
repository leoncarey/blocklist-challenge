const assert = require('assert').strict
const axios = require('axios')
const { cpf } = require('cpf-cnpj-validator')

const { MongoConnection } = require('../../../src/repository')
const { _findOne, _deleteOne } = require('../../util/mongo-actions')

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
          document: '67470813071',
          isBlocked: false,
          limit: 2
        },
        url: `${process.env.SERVICE_API_URL}/users`
      }

      let response = {}
      await assert.doesNotReject(async () => {
        response = await axios(options)
      })

      const userSelected = await _findOne(connection, { document: options.params.document })

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
})
