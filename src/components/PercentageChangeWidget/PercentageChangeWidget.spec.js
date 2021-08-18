import { mount } from '@vue/test-utils'
import PercentageChangeWidget from './PercentageChangeWidget.vue'
import { Default, Increase, CurrencyAndLocale, WithTooltip } from './PercentageChangeWidget.stories.js'

it('shows default values', () => {
  const wrapper = mount(PercentageChangeWidget, {
    propsData: Default.args,
  })
  expect(wrapper.text()).toContain('0.00%')
  expect(wrapper.text()).toContain('0 vs. 0')
})

it('calculates %', () => {
  const wrapper = mount(PercentageChangeWidget, {
    propsData: {
      value1: 100,
      value2: 50
    },
  })
  expect(wrapper.text()).toContain('100.00%')
})