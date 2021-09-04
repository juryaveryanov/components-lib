<template>
  <button class="WidgetHandle">
    <IconDraggable />
  </button>
</template>
<script>
import IconDraggable from '@/assets/icons/draggable.svg'
export default {
  name: 'WidgetHandle',
  components: {
    IconDraggable
  }
}
</script>
<style lang="scss" scoped>
    .WidgetHandle {
      box-sizing: border-box;
      width: 1.5rem;
      height: calc(2rem - 1px);
      padding: 0 .25rem;
      display: block;
      float: left;
      border: 0;
      background-color: $white;
      margin-left: -1rem;
      margin-right: .5rem;
      border-radius: $radius 0 0 0;
      cursor: move;
      fill: $light-gray;
      transition: opacity .5s ease;

      >svg{
          width: 100%;
          height: 100%;
          fill: $light-gray;
          transition: transform fill .5s ease;
      }
      &:hover {
          background-color: $almostwhite;
          >svg {
              fill: $primary-color;

          }
      }
    }
</style>
