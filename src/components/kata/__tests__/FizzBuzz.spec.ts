import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FizzBuzz from '../FizzBuzz/FizzBuzz.vue'

describe('FizzBuzz', () => {
  it('renders properly', () => {
    const wrapper = mount(FizzBuzz)
    expect(wrapper.text()).toContain('FizzBuzz Kata')
  })

  it('should count to 2', () => {
    const wrapper = mount(FizzBuzz)
    const list = wrapper.findAll('[data-test="list"] li')
    expect(list.at(0).text()).toContain('1')
    expect(list.at(1).text()).toContain('2')
  })

  it('should say fizz when it is a multiple of 3', () => {
    const wrapper = mount(FizzBuzz)
    const list = wrapper.findAll('[data-test="list"] li')
    expect(list.at(2).text()).toContain('fizz')
    expect(list.at(5).text()).toContain('fizz')
  })

  it('should say buzz whn it is a multiple of 5', () => {
    const wrapper = mount(FizzBuzz)
    const list = wrapper.findAll('[data-test="list"] li')
    expect(list.at(4).text()).toContain('buzz')
  })

  it('should say fizzbuzz when it is a multiple of 3 and 5', () => {
    const wrapper = mount(FizzBuzz)
    const list = wrapper.findAll('[data-test="list"] li')
    expect(list.at(14).text()).toContain('fizzbuzz')
  })

  it('should say fizzbuzzbuzz when it is divided by 5 and a contains 3 and 5', () => {
    const wrapper = mount(FizzBuzz)
    const list = wrapper.findAll('[data-test="list"] li')
    expect(list.at(34).text()).toContain('fizzbuzzbuzz')
  })

  it('should say fizzbuzz when it contains 3 and 5', () => {
    const wrapper = mount(FizzBuzz)
    const list = wrapper.findAll('[data-test="list"] li')
    expect(list.at(52).text()).toContain('fizzbuzz')
  })
})
