<template>
  <span
    class="Tooltip"
    role="tooltip"
    :aria-hidden="!isActive"
    @mouseenter="show(true)"
    @mouseleave="show(false)"
    @touchend="toggle"
  >
    <span>
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  name: 'Tooltip',
  data () {
    return ({
      isActive: false
    })
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
    },
    show (val) {
      this.isActive = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .Tooltip {
    display: inline-block;
    position: relative;
    height: 20px;
    width: 20px;
    border: 2px solid rgba($secondary-color, .5);
    border-radius: 50%;
    color: $secondary-color;
    vertical-align: text-bottom;
    text-align: center;
    transition: background-color .25s ease-out;
    background-color: transparent;
    cursor: help;
    box-sizing: border-box;

    >span {
      box-sizing: border-box;
      transform: scale3d(0, 0, 0);
      transition: transform .25s ease, opacity .25s ease-in-out;
      position: absolute;
      background-color: $white;
      @include box-shadow(3);
      border-radius: $radius;
      padding: .8rem 1.25rem 1rem;
      font-size: math.div(16, 18) + rem;
      line-height: 1.5;
      text-align: left;
      color: $dark-gray;
      transform-origin: right top;
      z-index: 2;
      cursor: default;
      top: 1.5rem;
      left: -12.125rem;
      width: 14rem;

      @media(min-width: $lg ){
        transform-origin: 0 1.15rem;
        top: -1.15rem;
        left: 1.5rem;
        width: 14rem;
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: -.35rem;
        right: 1rem;
        width: .75rem;
        height: .75rem;
        background-color: $white;
        transform-origin: center;
        transform: rotate(45deg);
        z-index: -1;

        @media(min-width: $lg ){
          top: 1.15rem;
          left: -.35rem;
          transform: rotate(45deg);
        }
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        left: -.5rem;
        top: .75rem;
      }
    }

  &::before,
  &::after {
    content: '';
    display: block;
    width: 2px;
    background-color: rgba($secondary-color, .5);
    position: absolute;
    left: calc(50% - 1px );
    top: calc( 50% - 1px );
    bottom: 3px;
    transition: all .25s ease-in;
  }
  &::before {
    top: 3px;
    height: 2px;
  }

  //&:hover,
  &[aria-hidden = false] {
    background-color: $secondary-color;
    transition: background-color .25s ease-in;
    >span {
      transform: scale3d(1,1,1);
      transition: transform .25s ease-in, opacity .25s ease-out;
    }
    &::before,
    &::after {
      background-color: $white;
      bottom: auto;
      top: 50%;
      transform: translateY( -50% ) rotate( 45deg );
      height: 68%;
      transform-origin: center;
      transition: all .25s ease-in;
    }
    &::after {
      transform: translateY( -50% ) rotate( -45deg );
    }
  }

  @keyframes toolTipFade {
    0% {
      opacity: 0;
      transform: scale3d(0, 0, 0);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
