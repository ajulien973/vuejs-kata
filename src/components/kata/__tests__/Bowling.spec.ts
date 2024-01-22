import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Bowling from '../Bowling/Bowling.vue'

describe('Bowling', () => {
  it('renders properly', () => {
    const wrapper = mount(Bowling)
    expect(wrapper.text()).toContain('Bowling Kata')
  })

  it('should render a score table', () => {
    const wrapper = mount(Bowling)
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score :');
  })

  it('should return a default score', () => {
    const wrapper = mount(Bowling)
    expect(wrapper.find('[data-test="score"]').text()).toContain('0');
  })

  it('should display 0 for a gutter game (= all zero)', () => {
    const game = [
      [0, 0], [0, 0],
      [0, 0], [0, 0],
      [0, 0], [0, 0],
      [0, 0], [0, 0],
      [0, 0], [0, 0],
    ]
    const wrapper = mount(Bowling, { propsData: { game }})
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score : 0');
  })

  it('should display 20 when 1 pin down for each throw', () => {
    const game = [
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
    ]
    const wrapper = mount(Bowling, { propsData: { game }})
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score : 20');
  })

  it('should display 29 when spare in first turn and 1 pin down for each other throw', () => {
    const game = [
      [9, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
    ]
    const wrapper = mount(Bowling, { propsData: { game }})
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score : 29');
  })

  it('should display 29 when spare in last turn and 1 pin down for each other throw', () => {
    const game = [
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [9, 1, 1],
    ]
    const wrapper = mount(Bowling, { propsData: { game }})
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score : 29');
  })

  it('should display 30 when strike in first turn and 1 pin down for each other throw', () => {
    const game = [
      [10], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
    ]
    const wrapper = mount(Bowling, { propsData: { game }})
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score : 30');
  })

  it('should display 30 when strike in last turn and 1 pin down for each other throw', () => {
    const game = [
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [1, 1],
      [1, 1], [10, 1, 1],
    ]
    const wrapper = mount(Bowling, { propsData: { game }})
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score : 30');
  })

  it('should display 300 when golden game', () => {
    const game = [
      [10], [10],
      [10], [10],
      [10], [10],
      [10], [10],
      [10], [10, 10, 10],
    ]
    const wrapper = mount(Bowling, { propsData: { game }})
    expect(wrapper.find('[data-test="score"]').text()).toContain('Score : 30');
  })
})
