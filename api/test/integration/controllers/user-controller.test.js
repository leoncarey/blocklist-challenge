const assert = require('assert').strict
const axios = require('axios')
const { cpf } = require('cpf-cnpj-validator')
const { mongoConfig } = require('../../../src/constants')

const { MongoRepository, MongoConnection } = require('../../../src/repository')

describe('Integration test for UserController', function () {
  let connection = {}
  let repository = {}

  before(async function () {
    connection = await MongoConnection.getConnection()
    repository = MongoRepository.setRepository(connection)
  })

  describe('get', function () {
    it('should return 200 when success', async function () {
      const options = {
        headers: {
          'Content-Type': 'application/json'
        },
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

      const userSelected = await repository.findOne({ document: options.params.document }, mongoConfig.COLLECTION)

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
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: `${process.env.SERVICE_API_URL}/users`
      }

      let response = {}
      await assert.doesNotReject(async () => {
        response = await axios(options)
      })

      const insertedUser = await repository.findOne({ document: options.data.document }, mongoConfig.COLLECTION)

      assert.notEqual(response.data, null)
      assert.equal(response.data.id, insertedUser._id.toString())

      await repository.deleteById(response.data.id, mongoConfig.COLLECTION)
    })
  })
})
