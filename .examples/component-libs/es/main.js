//import { createApp } from 'https://unpkg.com/vue@3.0.4/dist/vue.runtime.esm-browser.js'
import { ATooltip } from '/dist/components-lib.es.js'

export const app = Vue.createApp({
    render: () => Vue.h(ATooltip,{},["text"]),
})
if (document.getElementById('app')) {
  app.mount('#app')
}
