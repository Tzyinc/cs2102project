import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import UserList from '@/components/UserList.vue'
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Registration
    }
  ]
})
