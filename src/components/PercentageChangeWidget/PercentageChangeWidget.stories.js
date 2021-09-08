import PercentageChangeWidget from './PercentageChangeWidget.vue'
import ATooltip from '@/components/ATooltip/ATooltip.vue'
import WidgetHandle from '@/components/WidgetHandle/WidgetHandle.vue'
import getCodeSnippet from '@/storybook/getCodeSnippet.js'

export default {
  title: 'Widgets/Percentage change widget',
  component: PercentageChangeWidget,
  argTypes: {
    aTitle: {
      control: 'text',
      description: 'Title text',
      default: 'Title'
    },
    oldValue: {
      control: 'number',
      description: 'Value 1',
      default: 50
    },
    newValue: {
      control: 'number',
      description: 'Value 2',
      default: 100
    },
    locale: {
      description: 'Locale',
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
      description: 'Currency Code',
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
    newValueFirst: {
      type: Boolean,
      description: 'Reverse order of values',
      control: 'boolean',
      default: false
    },
    reverseColors: {
      type: Boolean,
      description: 'Reverse arrow color change',
      control: 'boolean',
      default: false
    },
    info: {
      control: 'text',
      description: 'Slot content',
      default: '',
      table: {
        type: {
          summary: null
        }
      }
    },
    controls: {
      control: 'text',
      description: 'Slot content',
      default: '',
      table: {
        type: {
          summary: null
        }
      }
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'dynamic'
      }
    }
  }
}

const Template = (args) => ({
  components: { PercentageChangeWidget, ATooltip, WidgetHandle },
  setup () {
    return { args }
  },
  template:
    `<div style="max-width:18rem"><percentage-change-widget v-bind="args">
      <template #info>${args.info ? args.info : ''}</template>
      <template #controls>${args.controls ? args.controls : ''}</template>
    </percentage-change-widget></div>`
})

export const Default = Template.bind({})
Default.args = {
  oldValue: 12345,
  newValue: 54321,
  aTitle: 'Widget Title',
  currencyCode: 'USD',
  locale: 'en-US',
  newValueFirst: true,
  reverseColors: true,
  info: '<ATooltip>Toolltip message</ATooltip>',
  controls: '<WidgetHandle>Toolltip message</WidgetHandle>'
}

Default.parameters = {
  docs: {
    previewSource: 'open',
    source: {
      state: 'open',
      type: 'code',
      code: getCodeSnippet(PercentageChangeWidget, Default.args)
    }
  }
}

export const Decrease = Template.bind({})
Decrease.args = {
  oldValue: 54321,
  newValue: 12345,
  aTitle: 'Widget Title'
}

Decrease.parameters = {
  docs: {
    source: { type: 'code', code: getCodeSnippet(PercentageChangeWidget, Decrease.args) }
  }
}

export const Increase = Template.bind({})
Increase.args = {
  aTitle: 'Widget Title',
  newValue: 54321,
  oldValue: 12345
}

Increase.parameters = {
  docs: {
    source: { type: 'code', code: getCodeSnippet(PercentageChangeWidget, Increase.args) }
  }
}

export const CurrencyAndLocale = Template.bind({})
CurrencyAndLocale.args = {
  ...Decrease.args,
  currencyCode: 'EUR',
  locale: 'de-DE'
}

CurrencyAndLocale.parameters = {
  docs: {
    source: { type: 'code', code: getCodeSnippet(PercentageChangeWidget, CurrencyAndLocale.args) }
  }
}
