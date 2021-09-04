<script>
import Draggable from 'vuedraggable'
import { h, TransitionGroup } from 'vue'

export default {
  name: 'WidgetsLayout',
  components: {
    Draggable,
    TransitionGroup
  },
  emits: ['changeOrder'],
  data () {
    return {
      widgets: []
    }
  },
  mounted () {
    this.widgets = this.$slots.default().map(
      (vNode, n) => {
        return {
          itemNode: vNode,
          itemId: vNode.props.id
        }
      }
    )
  },
  methods: {
    changeOrderEvent ({ moved }) {
      const { oldIndex, newIndex } = moved
      this.$emit('changeOrder',
        {
          order: this.widgets.map(item => item.itemId),
          oldIndex,
          newIndex
        })
    }
  },

  render () {
    return (
      h(
        Draggable,
        {
          itemKey: 'itemId',
          list: this.widgets,
          disabled: false,
          handle: '.WidgetHandle',
          tag: 'transition-group',
          ghostClass: 'ghost',
          class: 'WidgetsLayout',
          onChange: this.changeOrderEvent,
          componentData: {
            tag: 'div',
            name: 'flip-list',
            type: 'transition'
          }
        },
        {
          item: ({ element }) => {
            return h(
              'div',
              {
                itemId: element.itemId,
                class: 'WidgetsLayout-item'
              },
              [
                element.itemNode
              ]
            )
          }
        }
      )
    )
  }
}
</script>
<style lang="scss" scoped>
  .WidgetsLayout {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    position: relative;
    margin: -.5rem;
    *{
      box-sizing: border-box;
    }
    .WidgetsLayout-item {
      width: 100%;
      padding: calc(.5rem - 1px);
      border: 1px dashed transparent;
      box-sizing: border-box;
      transition: border-color .5s ease;
      @media (min-width: $sm) {
        width: 50%;
      }
      @media(min-width: $md) {
        width: 33.333%;
      }
      @media(min-width: $xl) {
        width: 25%;
      }
      &.ghost {
        border-color: $secondary-color;
        transition: border-color .5s ease;
        opacity: .75;
      }
      &.flip-list-move {
        transition: transform 0.5s;
      }
      &.no-move {
        transition: transform 0s;
      }
    }

  }
</style>
