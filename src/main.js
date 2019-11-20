import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Logo from '@/components/Logo'

Vue.config.productionTip = false

Vue.component('logo', Logo)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
