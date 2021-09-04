<template>
  <svg>
    <title v-if="title">{{ title }}</title>
    <use :href="iconPath" />
  </svg>
</template>

<script>

// const icons = import.meta.globEager('../src/assets/icons/**/*.svg')
// icons.notreeshake = 1

export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  },

  computed: {
    iconPath () {
      return `#icon-${this.name}`
    },

    className () {
      return 'svg-icon svg-icon--' + this.name
    }
  }
}
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 24px;
    width: 24px;
  }
</style>
