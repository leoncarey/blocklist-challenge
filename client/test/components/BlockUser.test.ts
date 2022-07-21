import { createSandbox } from 'sinon'
import { afterEach, assert, beforeEach, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ElementPlus from 'element-plus'

import BlockUser from '@/components/BlockUser/BlockUser.vue'
import { UserService } from '../../src/services'

const sandbox = createSandbox()

describe('Unit tests for BlockUser component', function () {
  const userId = 'foo-bar'

  afterEach(() => {
    sandbox.restore()
  })

  it('should not returns error adding User', async () => {
    const userServiceStub = sandbox.stub(UserService, 'updateBlockUser').resolves({ _id: userId })

    const wrapper = mount(BlockUser, {
      props: {
        blocked: true,
        userId: userId,
        reloadTable: () => true,
      },
      global: {
        plugins: [ElementPlus],
      },
    })

    await wrapper.find('el-button').trigger('click')

    assert(wrapper.emitted()['update:loader'].length === 1)
    assert(userServiceStub.calledOnce)
  })

  it('should return error when UserService is called', () => {
    const userServiceStub = sandbox.stub(UserService, 'updateBlockUser').throws({
      response: {
        data: 'Error',
      },
    })

    const wrapper = mount(BlockUser, {
      props: {
        blocked: true,
        userId: userId,
        reloadTable: () => true,
      },
    })

    wrapper.find('el-button').trigger('click')

    assert(wrapper.emitted()['update:loader'].length === 2)
    assert(userServiceStub.calledOnce)
  })
})
