import { defineCustomElement } from 'vue'
import * as components from './index.js'

Object.keys(components).forEach(componentName => {
  const name = componentName.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-')
  const customElement = defineCustomElement(components[componentName])
  customElements.define(name, customElement)
})
