import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ElementPlus from 'element-plus'

import Header from '@/components/Header/Header.vue'

describe('Unit tests for Header', function () {
  it('should check if title is in document', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [ElementPlus]
      }
    })

    const titleIsIt = wrapper.get('.title').html()
    expect(titleIsIt).toContain('Blockclist de CPF/CNPJ')
  })
})
