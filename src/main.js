// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import NewsApp from './NewsApp'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.config.productionTip = false

import session from 'vue-session'
Vue.use(session)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  session,
  template: '<App/>',
  components: { App }
})

/*
new NewsVue({
  el: '#newsapp',
  router,
  template: '<NewsApp/>',
  components: { NewsApp }
})*/
