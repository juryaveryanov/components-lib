import PercentageChangeWidget from './PercentageChangeWidget.vue'

export default {
  title: 'Percentage change widget',
  component: PercentageChangeWidget,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text',
      default: 'Title'
    },
    value1: {
      control: 'number',
      description: 'Value 1',
      default: 50
    },
    value2: {
      control: 'number',
      description: 'Value 2',
      default: 100
    },
    locale: {
      options: [
        'en-US',
        'ru-RU',
        'de-DE'
      ],
      control: {
        type: 'select'
      },
      default: 'en-US'
    },
    currencyCode: {
      options: [
        '',
        'USD',
        'EUR',
        'CNY'
      ],
      control: {
        type: 'select'
      },
      default: ''
    },
    description: {
      control: 'text',
      description: 'Tooltip text',
      default: ''
    }
  },
  parameters: {
    jest: ['PercentageChangeWidget.spec.js']
  }
}

const Template = (args) => ({
  components: { PercentageChangeWidget },
  setup () {
    return { args }
  },
  template: `
    <PercentageChangeWidget v-bind="args">
      <template v-if="${!!args.description}" #description>
        ${args.description}
      </template>
    </PercentageChangeWidget>
  `
})

export const Default = Template.bind({})

export const Increase = Template.bind({})
Increase.args = {
  value1: 54321,
  value2: 12345,
  title: 'Active Publishers'
}

export const Decrease = Template.bind({})
Decrease.args = {
  value2: 54321,
  value1: 12345,
  title: 'Total Spend NET'
}

export const CurrencyAndLocale = Template.bind({})
CurrencyAndLocale.args = {
  ...Increase.args,
  currencyCode: 'USD',
  locale: 'en-US'
}

export const WithTooltip = Template.bind({})
WithTooltip.args = {
  ...CurrencyAndLocale.args,
  description: `Praesent diam ante, scelerisque sed lacinia vitae,
  mattis at dui. Ut vestibulum ex vel odio aliquam semper.
  Integer nec dapibus sapien. Donec ex metus, pulvinar et vehicula at,
  convallis et sapien. Sed facilisis vitae justo sit amet lobortis.`
}
