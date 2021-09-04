import ATooltip from '@/components/ATooltip/ATooltip.vue'

export default {
  title: 'UI/Tooltip',
  component: ATooltip,
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
    }
  }
}

const Template = (args) => ({
  components: { ATooltip },
  setup () {
    return { args }
  },
  template:
    `<div>
      <ATooltip>
        ${args.default ? args.default : ''}
      </ATooltip>
      <div style="float: right">
        <ATooltip>
          ${args.default ? args.default : ''}
        </ATooltip>
      </div>
    </div>`
})
export const Default = Template.bind({})
Default.args =
{
  default: `<b>Praesent diam ante, scelerisque sed lacinia vitae mattis at dui.</b><br>
Ut vestibulum ex vel odio aliquam semper.
Integer nec dapibus sapien. Donec ex metus, pulvinar et vehicula at,
convallis et sapien. Sed facilisis vitae justo sit amet lobortis.`
}
Default.parameters = {
  docs: {
    previewSource: 'open',
    source: {
      state: 'open',
      type: 'code',
      code: `
<ATooltip>
  <template #default>
  Tooltip Content
  </template>
</ATooltip>
`
    }
  }
}
