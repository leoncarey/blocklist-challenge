import nock from 'nock'
import { createSandbox } from 'sinon'
import { assert, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import axios from 'axios'

import { UserService } from '../../src/services'
import config from '../../src/services/config'

const sandbox = createSandbox()

describe('Unit tests for UserService', () => {
  afterEach(() => {
    sandbox.restore()
  })

  describe('Tests for getUsers', () => {
    it('should not returns error', async () => {
      const resultMock = {
        items: [],
        totalCount: 10,
      }

      nock(config.SERVICE_API_URL).get('/users').reply(200, resultMock)

      const responseData: any = await UserService.getUsers({}, {})
      assert.deepEqual(responseData, resultMock)
    })

    it('should return error 400', async () => {
      const resultMock = { errorCode: 'VALIDATION_ERROR' }

      nock(config.SERVICE_API_URL).get('/users').reply(400, resultMock)

      try {
        await UserService.getUsers({}, {})
      } catch (error: any) {
        assert.equal(error.response.data.errorCode, resultMock.errorCode)
      }
    })
  })

  describe('Tests for saveUser', () => {
    it('should not returns error', async () => {
      const resultMock = {
        _id: 'FOO-ID',
      }

      nock(config.SERVICE_API_URL).post('/users').reply(200, resultMock)

      const responseData: any = await UserService.saveUser({ userName: '', document: '', blocked: true })
      assert.deepEqual(responseData, resultMock)
    })

    it('should return error 400', async () => {
      const resultMock = { errorCode: 'VALIDATION_ERROR' }

      nock(config.SERVICE_API_URL).post('/users').reply(400, resultMock)

      try {
        await UserService.saveUser({ userName: '', document: '', blocked: true })
      } catch (error: any) {
        assert.equal(error.response.data.errorCode, resultMock.errorCode)
      }
    })
  })

  describe('Tests for deleteUser', () => {
    it('should not returns error', async () => {
      const resultMock = {
        userDeleted: 'FOO-ID',
      }

      nock(config.SERVICE_API_URL).delete(`/users/${resultMock.userDeleted}`).reply(200, resultMock)

      const responseData: any = await UserService.deleteUser(resultMock.userDeleted)
      assert.deepEqual(responseData, resultMock)
    })

    it('should return error 400', async () => {
      const resultMock = { errorCode: 'VALIDATION_ERROR' }
      const userId = 'FOO-ID'

      nock(config.SERVICE_API_URL).delete(`/users/${userId}`).reply(400, resultMock)

      try {
        await UserService.deleteUser(userId)
      } catch (error: any) {
        assert.equal(error.response.data.errorCode, resultMock.errorCode)
      }
    })
  })

  describe('Tests for updateBlockUser', () => {
    it('should not returns error', async () => {
      const resultMock = {
        _id: 'FOO-ID',
      }

      nock(config.SERVICE_API_URL).patch(`/users/${resultMock._id}`).reply(200, resultMock)

      const responseData: any = await UserService.updateBlockUser(resultMock._id, false)
      assert.deepEqual(responseData, resultMock)
    })

    it('should return error 400', async () => {
      const resultMock = { errorCode: 'VALIDATION_ERROR' }
      const userId = 'FOO-ID'

      nock(config.SERVICE_API_URL).patch(`/users/${userId}`).reply(400, resultMock)

      try {
        await UserService.updateBlockUser(userId, false)
      } catch (error: any) {
        assert.equal(error.response.data.errorCode, resultMock.errorCode)
      }
    })
  })
})
