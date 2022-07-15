const assert = require('assert').strict
const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../../src/app')

chai.use(chaiHttp)

describe('Integration tests for health', function () {
  describe('Test for GET route', function () {
    it('should success when ping', async function () {
      const ROUTE = '/healthz'

      const res = await chai.request(app)
        .get(ROUTE)

      assert.equal(200, res.status)
    })
  })
})
