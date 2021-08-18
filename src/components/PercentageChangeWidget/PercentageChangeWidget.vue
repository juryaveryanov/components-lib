<template>
  <div class="PercentageChangeWidget">
    <h5
      v-if="title"
      class="PercentageChangeWidget-title"
    >
      {{ title }}
    </h5>
    <div
      class="PercentageChangeWidget-difference"
      :class="{ isGrows: isGrows }"
    >
      <span>{{ difference }}</span>
      <svg v-if="iconID"><use :href="iconID" /></svg>
    </div>
    <div class="PercentageChangeWidget-comparedValues">
      {{ comparedValues }}
    </div>
    <Tooltip
      v-if="$slots.description"
      class="PercentageChangeWidget-description"
    >
      <slot name="description" />
    </Tooltip>
  </div>
</template>

<script>

import arrowUp from '@/assets/icons/arrow-up.svg'
import arrowDown from '@/assets/icons/arrow-down.svg'
import Tooltip from '@/components/Tooltip/Tooltip.vue'

export default {
  components: {
    Tooltip
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value1: {
      type: Number,
      validator (val) {
        return val >= 0
      },
      default: 0
    },
    value2: {
      type: Number,
      validator (val) {
        return val >= 0
      },
      default: 0
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    currencyCode: {
      type: String,
      default: ''
    }
  },
  computed: {
    difference () {
      let value = 0
      if (this.value2 !== 0) {
        value = Math.abs((this.value2 - this.value1) / this.value2)
      } else if (this.value1 !== 0) {
        value = 1
      }
      return value.toLocaleString(this.locale, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    },
    iconID () {
      const diff = this.value1 - this.value2
      if (diff > 0) {
        return '#' + arrowUp
      } else if (diff < 0) {
        return '#' + arrowDown
      }
      return null
    },
    isGrows () {
      return this.value1 - this.value2 > 0
    },
    comparedValues () {
      let numberFormat
      if (this.currencyCode) {
        numberFormat = new Intl.NumberFormat(
          this.locale,
          {
            style: 'currency',
            currency: this.currencyCode,
            maximumFractionDigits: 2
          }
        )
      } else {
        numberFormat = new Intl.NumberFormat(
          this.locale,
          {
            style: 'decimal',
            maximumFractionDigits: 2
          }
        )
      }
      return `${numberFormat.format(this.value1)} vs. ${numberFormat.format(this.value2)}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .PercentageChangeWidget {
    position: relative;
    border: 1px solid $lightest-gray;
    max-width: 18rem;
    padding: 1rem .75rem;
    border-radius: $radius;
    box-sizing: border-box;

    &-description {
      position: absolute;
      top: .5rem;
      right: .5rem;
    }

    &-difference {
      margin-bottom: .5rem;
      >span {
        font-size: 1.75rem;
        vertical-align: baseline;
        line-height: .68;
        margin-right: .25rem;
        color: $dark-gray;
        font-weight: $bolder;
      }
      >svg {
        height: 1.19rem;
        width: 1.19rem;
        fill: $error;
        display: inline-block;
        opacity: .5;
      }
      &.isGrows {
        >svg {
          fill: $success;
        }
      }
    }
    &-comparedValues,
    &-title {
      font-size: math.div(15,16) + rem;
      text-transform: uppercase;
      font-style: italic;
      font-weight: $bolder;
      color: $light-gray;
    }
    &-title {
      font-style: normal;
      font-weight: normal;
      margin: -1rem -.75rem 1rem;
      padding: .5rem .75rem;
      text-transform: none;
      border-bottom: 1px solid $lightest-gray;
    }
  }
</style>
