import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TennisScore from "../Tennis/TennisScore.vue";

describe('TennisScore', () => {
  it('renders properly', () => {
    const wrapper = mount(TennisScore)
    expect(wrapper.text()).toContain('Tennis Kata')
  })

  it('should set default score', () => {
    const wrapper = mount(TennisScore)
    expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('love')
    expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('love')
  })

  describe('add points', () => {
    it('should go from 0 to 40', () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('15')

      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('30')

      wrapper.getComponent(TennisScore).vm.addPoint(1)
      expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('40')
    })

    describe('winning state : when player has 40 and state is not deuce', () => {
      it('should reset both players points and set winner', () => {
        const wrapper = mount(TennisScore)
        wrapper.getComponent(TennisScore).vm.scorePlayerOne = '40'
        wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '15'

        wrapper.getComponent(TennisScore).vm.addPoint(1)
        expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('love')
        expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('love')
        expect(wrapper.getComponent(TennisScore).vm.winner).toBe('Player 1')

      })
    })

    describe('winning state : when player has advantage', () => {
      it('should reset both players points and set winner', () => {
        const wrapper = mount(TennisScore)
        wrapper.getComponent(TennisScore).vm.scorePlayerOne = 'av'
        wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '40'

        wrapper.getComponent(TennisScore).vm.addPoint(1)
        expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('love')
        expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('love')
        expect(wrapper.getComponent(TennisScore).vm.winner).toBe('Player 1')
      })
    })

    describe('when status is deuce', () => {
      it('should give advantage to the player that scores a point', () => {
        const wrapper = mount(TennisScore)
        wrapper.getComponent(TennisScore).vm.scorePlayerOne = '40'
        wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '40'

        wrapper.getComponent(TennisScore).vm.addPoint(1)
        expect(wrapper.getComponent(TennisScore).vm.scorePlayerOne).toBe('av')
        expect(wrapper.getComponent(TennisScore).vm.scorePlayerTwo).toBe('40')
      })
    })

    describe('when status is advantage', () => {
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

  describe('display', () => {
    it('should display current score', () => {
      const wrapper = mount(TennisScore)
      expect(wrapper.find('[data-test="score"]').text()).toContain('love - love')
    })

    it('should add point to player one', async () => {
      const wrapper = mount(TennisScore)

      await wrapper.find('[data-test="player1-add"]').trigger('click')
      expect(wrapper.find('[data-test="score"]').text()).toContain('15 - love')
      await wrapper.find('[data-test="player2-add"]').trigger('click')
      expect(wrapper.find('[data-test="score"]').text()).toContain('15 - 15')
    })

    it('should display winner', async () => {
      const wrapper = mount(TennisScore)
      wrapper.getComponent(TennisScore).vm.scorePlayerOne = 'av'
      wrapper.getComponent(TennisScore).vm.scorePlayerTwo = '40'

      await wrapper.find('[data-test="player1-add"]').trigger('click')
      expect(wrapper.find('[data-test="winner"]').text()).toContain('Player 1 Wins !')
    })
  })
})
