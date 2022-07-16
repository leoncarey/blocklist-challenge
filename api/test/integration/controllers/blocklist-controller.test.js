const assert = require('assert').strict
const axios = require('axios')

describe('Integration test for BlocklistController', function () {
  describe('get', function () {
    it('should return 200 when success', async function () {
      const options = {
        method: 'get',
        params: {
          document: '67470813071',
          isBlocked: false,
          limit: 2
        },
        url: `${process.env.SERVICE_API_URL}/get-blocklist`
      }

      let res = {}
      await assert.doesNotReject(async () => {
        res = await axios(options)
      })

      assert.notEqual(res, null)
    })
  })
})
