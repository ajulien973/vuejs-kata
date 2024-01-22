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

    it('should reset both players points if one player goes after 40 and state is not deuce', () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.scorePlayerOne = '40'
      wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '15'

      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('love')
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('love')
    })

    it('should give advantage to the player that scores a point when status is deuce', () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.scorePlayerOne = '40'
      wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '40'

      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('av')
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('40')
    })

    it('should go back to deuce when the player without advantage scores a point', () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.scorePlayerOne = 'av'
      wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '40'

      wrapper.getComponent(TennisScore).vm.addPoint(2)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('40')
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('40')

      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('av')
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('40')

      wrapper.getComponent(TennisScore).vm.addPoint(2)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('40')
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('40')
    })
  })

  describe('isDeuce', () => {
    it('should be true when players both have 40', () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.scorePlayerOne = '40'
      wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '40'
      expect(wrapper.getComponent(TennisScore).vm.isDeuce()).toBe(true)
    })
  })

  describe('isAdvantage', () => {
    it('should be true when one player has av', () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.scorePlayerOne = 'av'
      wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '40'
      expect(wrapper.getComponent(TennisScore).vm.isAdvantage()).toBe(true)

      wrapper.getComponent(TennisScore).vm.scorePlayerOne = '40'
      wrapper.getComponent(TennisScore).vm.scorePlayerTwo = 'av'
      expect(wrapper.getComponent(TennisScore).vm.isAdvantage()).toBe(true)
    })
  })
})
