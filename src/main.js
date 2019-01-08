// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import VueKonva from 'vue-konva'
import 'mint-ui/lib/style.css'
import VueClipboard from 'vue-clipboard2'
import 'babel-polyfill'
import CuteModal from 'vue-cute-modal'
import 'vue-cute-modal/dist/vue-cute-modal.es.css'


Vue.use(Mint)
Vue.use(VueKonva)
Vue.use(VueClipboard)
Vue.use(CuteModal)
Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

export default vue
