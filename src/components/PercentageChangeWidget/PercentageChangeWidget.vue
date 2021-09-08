<template>
  <div
    class="PercentageChangeWidget"
    :class="{ isGrows: changeDynamic > 0, reverseColors: reverseColors }"
  >
    <h5 class="PercentageChangeWidget-title">
      <slot name="controls" />
      {{ aTitle }}
    </h5>
    <div
      class="PercentageChangeWidget-difference"
    >
      <span>{{ difference }}</span>
      <ArrowUp
        v-if="changeDynamic > 0"
        name="arrow-up"
      />
      <ArrowDown
        v-else-if="changeDynamic < 0"
        name="arrow-down"
      />
    </div>
    <div
      v-if="newValueFirst"
      class="PercentageChangeWidget-comparedValues"
    >
      <span class="newVal">{{ formatted.new }}</span> vs. {{ formatted.old }}
    </div>
    <div
      v-else
      class="PercentageChangeWidget-comparedValues"
    >
      {{ formatted.old }} vs. <span class="newVal">{{ formatted.new }}</span>
    </div>
    <div class="PercentageChangeWidget-tooltip">
      <slot name="info" />
    </div>
  </div>
</template>
<script>
import ArrowUp from '@/assets/icons/arrow-up.svg'
import ArrowDown from '@/assets/icons/arrow-down.svg'

export default {
  components: {
    ArrowDown,
    ArrowUp
  },
  props: {
    aTitle: {
      type: String,
      default: ''
    },
    oldValue: {
      type: Number,
      validator (val) {
        return val >= 0
      },
      default: 0
    },
    newValue: {
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
    },
    reverseColors: {
      type: Boolean,
      default: false
    },
    newValueFirst: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    difference () {
      let value = 0
      if (this.oldValue !== 0) {
        value = Math.abs((this.newValue - this.oldValue) / this.oldValue)
      } else if (this.oldValue === 0) {
        value = 1
      }
      return value.toLocaleString(this.locale, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    },
    changeDynamic () {
      const diff = this.newValue - this.oldValue
      if (diff > 0) {
        return 1
      } else if (diff < 0) {
        return -1
      }
      return null
    },
    formatted () {
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
      return {
        new: numberFormat.format(this.newValue),
        old: numberFormat.format(this.oldValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .PercentageChangeWidget {
    position: relative;
    border: 1px solid $lightest-gray;
    padding: 0 1rem;
    border-radius: $radius;
    background-color: $white;
    box-sizing: border-box;
    height: 7rem;

    --grows-color: #{$error};
    &.isGrows {
      --grows-color: #{$success};
       &.reverseColors {
         --grows-color: #{$error};
       }
    }

    *{
      box-sizing: border-box;
    }
    &-tooltip {
      position: absolute;
      top: .3125rem;
      right: calc(.5rem - 1px);
    }

    &-difference {
      height: 1.5rem;
      padding: .125rem 0;
      >span {
        font-size: 1.75rem;
        vertical-align: baseline;
        line-height: .67;
        margin-right: .25rem;
        color: $dark-gray;
        font-weight: $bolder;
      }
      >svg {
        height: 1.19rem;
        width: 1.19rem;
        fill: var(--grows-color);
        display: inline-block;
        opacity: .5;
        padding: .125rem;
      }
    }
    &-comparedValues {
      font-size: math.div(14,16) + rem;
      text-transform: uppercase;
      font-style: italic;
      font-weight: $bolder;
      color: $light-gray;
      height: 2.25rem;
      line-height: 2.25rem;
    }
    &-title {
      font-size: 1rem;
      font-style: normal;
      color: $gray;
      font-weight: $bolder;
      font-size: math.div(14,16) + rem;
      margin: 0 -1rem 1rem;
      padding: 0 1rem;
      text-transform: none;
      border-bottom: 1px solid $lightest-gray;
      height: 2rem;
      line-height: 2rem;
    }
  }
</style>
