import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Home from '@/pages/Home/Home.vue'

describe('Unit tests for Home component', function () {
  it.only('should mount component without errors', async () => {
    const wrapper = mount(Home)
    // const title = wrapper.find('.title').text()

    // console.log(title)

    // expect().toContain('Blockclist Challenge')
  })
})
