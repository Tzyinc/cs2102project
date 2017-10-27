// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import NewsApp from './NewsApp'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

import VueSession from 'vue-session'
Vue.use(VueSession)

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

/*
new NewsVue({
  el: '#newsapp',
  router,
  template: '<NewsApp/>',
  components: { NewsApp }
})*/
