// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import Header from '@/components/Header/Header.vue'

describe('Unit tests for Header', function () {
  it('should dar oi', () => {
    const wrapper = mount(Header)

    expect(wrapper)
  })
})