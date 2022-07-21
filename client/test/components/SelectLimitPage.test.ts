import { createSandbox } from 'sinon'
import { afterEach, assert, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import SelectLimitPage from '@/components/SelectLimitPage/SelectLimitPage.vue'
import { ElementPlus } from '@element-plus/icons-vue'

const sandbox = createSandbox()

describe('Unit tests for SelectLimitPage component', function () {
  let wrapper: any = null

  beforeEach(() => {
    wrapper = mount(SelectLimitPage, {
      props: {
        pageLimit: 5,
        pageLimitOptions: [15, 10, 5],
        reloadTable: () => true,
      },
      setup() {
        return {
          ElementPlus,
        }
      },
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should check options populate', async () => {
    const options: any = wrapper.findAll('el-option')
    assert(options.length === 3)

    const passOptions = wrapper.props().pageLimitOptions

    for (const option of options) {
      const optionValue = option.attributes().value
      assert(passOptions.includes(parseInt(optionValue, 10)))
    }
  })

  it('should change select value', async () => {
    await wrapper.find('el-select').trigger('change')

    assert(wrapper.emitted()['update:pageLimit'].length === 1)
  })
})
