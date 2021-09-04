import PercentageChangeWidget from '@/components/PercentageChangeWidget/PercentageChangeWidget.vue'
import ATooltip from '@/components/ATooltip/ATooltip.vue'
import WidgetsLayout from '@/components/WidgetsLayout/WidgetsLayout.vue'
import WidgetHandle from '@/components/WidgetHandle/WidgetHandle.vue'

export default {
  title: 'Widgets/Drag\'n\'drop Layout',
  component: WidgetsLayout,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      default: '',
      table: {
        type: {
          summary: null
        }
      }
    },
    onChangeOrder: { action: 'changeOrder' }
  }
}

let templateStr = ''
for (let i = 0; i < 10; i++) {
  templateStr += `
  <PercentageChangeWidget 
    title="Widget title ${i}" 
    id="${'item_id_' + i}" 
    :oldValue="${Math.random() * 10000}" 
    :newValue="${Math.random() * 10000}"
  >
  <template #controls>
    <WidgetHandle/>
  </template>
  <template #info>
    <ATooltip>Tooltip text ${i}</ATooltip>
  </template>
  </PercentageChangeWidget>
  `
}

const Template = (args) => ({
  components: { ATooltip, PercentageChangeWidget, WidgetsLayout, WidgetHandle },
  setup () {
    return { args }
  },
  template:
    `<WidgetsLayout v-bind="args">
        <template #default>
        ${templateStr}
        </template>
    </WidgetsLayout>`
})
export const Default = Template.bind({})

Default.parameters = {
  docs: {
    previewSource: 'open',
    source: {
      state: 'open',
      type: 'code',
      code:
`
<WidgetsLayout v-bind="args">
// ...
  <PercentageChangeWidget 
    title="Widget title" 
    id="item_id_1" 
    :oldValue="${Math.random() * 10000}" 
    :newValue="${Math.random() * 10000}"
  />
  <PercentageChangeWidget 
    title="Widget title" 
    id="item_id_2" 
    :oldValue="${Math.random() * 10000}" 
    :newValue="${Math.random() * 10000}"
  />
  // ...
</WidgetsLayout>

`
    }
  }
}
