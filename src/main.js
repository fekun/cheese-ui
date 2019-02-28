import Vue from 'vue'
import App from './App.vue'
// import DefaultAvatar from './components/DafaultAvatar/index'
import cheeseui from './index'

Vue.config.productionTip = false
Vue.use(cheeseui)

new Vue({
  render: h => h(App)
}).$mount('#app')
