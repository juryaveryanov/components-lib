<template>
  <span
    ref="span"
    class="ATooltip"
    role="tooltip"
    :aria-hidden="!isActive"
    @mouseenter="show(true)"
    @mouseleave="show(false)"
    @touchend="toggle"
  >
    <span
      :class="position"
    >
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  name: 'ATooltip',
  data () {
    return ({
      isActive: false,
      position: 'right'
    })
  },

  methods: {
    toggle () {
      this.isActive = !this.isActive
    },
    setPosition () {
      const offset = this.$refs.span.getBoundingClientRect()
      let position = 'right'
      if (offset.left + 250 > window.innerWidth) {
        position = 'left'
        if (offset.left - 250 < 0) {
          position = 'bottomCenter'
        }
      }
      this.position = position
    },
    show (val) {
      if (val) {
        this.setPosition()
      }

      this.isActive = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .ATooltip {
    display: inline-block;
    position: relative;
    height: 1.25rem;
    width: 1.25rem;
    border: .125rem solid rgba($secondary-color, .5);
    border-radius: 50%;
    color: $secondary-color;
    vertical-align: text-bottom;
    text-align: center;
    transition: background-color .25s ease-out;
    background-color: transparent;
    cursor: help;
    line-height: 0;
    box-sizing: border-box;

    * {
      box-sizing: border-box;
    }

    >span {
      transform: scale3d(0, 0, 0);
      transition: transform .25s ease, opacity .25s ease-in-out;
      position: absolute;
      background-color: $white;
      @include box-shadow(3);
      border-radius: $radius;
      padding: .8rem 1.25rem 1rem;
      font-size: .875rem;
      line-height: 1.5;
      text-align: left;
      color: $dark-gray;
      transform-origin: right top;
      z-index: 2;
      cursor: default;
      top: 1.5rem;
      width: 14rem;

      &.right {
        top: -1.15rem;
        left: 1.5rem;
        transform-origin: 0 1.15rem;
        &::before{
          top: 1.15rem;
          left: -.35rem;
        }
      }

      &.left {
        top: -1.15rem;
        right: 1.5rem;
        &::before {
          top: 1.15rem;
          right: -.35rem;
        }
      }
      &.bottomCenter {
        top: 1.5rem;
        left: -7rem;
        &::before {
          top: -.35rem;
          right: 50%;
          transform: translateX(115%) rotate(45deg);
        }
      }

      /* &.bottomLeft {
        top: 1.5rem;
        left: -12rem;
        &::before {
          top: -.35rem;
          right: 100%;
          transform: translateX(115%) rotate(45deg);
        }
      }
      &.bottomRight {
        top: 1.5rem;
        left: -.35rem;
        &::before {
          top: -.35rem;
          left: .5rem;
        }
      }
      */
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: -.35rem;
        width: .75rem;
        height: .75rem;
        background-color: $white;
        transform-origin: center;
        transform: rotate(45deg);
        z-index: -1;
      }
    }

  &::before,
  &::after {
    content: '';
    display: block;
    width: .125rem;
    background-color: rgba($secondary-color, .5);
    position: absolute;
    left: calc(50% - .0625rem);
    top: calc(50% - .0625rem);
    bottom: .1875rem;
    transition: all .25s ease-in;
  }
  &::before {
    top: .1875rem;
    height: .125rem;
  }

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
