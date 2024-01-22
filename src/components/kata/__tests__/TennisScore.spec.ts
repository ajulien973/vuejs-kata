import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TennisScore from "../Tennis/TennisScore.vue";

describe('TennisScore', () => {
  it('renders properly', () => {
    const wrapper = mount(TennisScore)
    expect(wrapper.text()).toContain('Tennis Kata')
  })

  it('Sets default score', () => {
    const wrapper = mount(TennisScore)
    expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('love')
    expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('love')
  })

  describe('add points', () => {
    it('goes from 0 to 40', () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('15')

      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('30')

      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('40')
    })
  })
  })
})
