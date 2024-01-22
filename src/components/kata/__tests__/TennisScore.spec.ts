import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TennisScore from "../Tennis/TennisScore.vue";

describe('TennisScore', () => {
  it('renders properly', () => {
    const wrapper = mount(TennisScore)
    expect(wrapper.text()).toContain('Tennis Kata')
  })
})
