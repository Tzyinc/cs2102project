import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import UserList from '@/components/UserList.vue'
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'
import CreateItem from '@/components/CreateItem.vue'
import BrowseItem from '@/components/BrowseItem.vue'
import MyListing from '@/components/MyListing.vue'

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
    },
    {
      path: '/createItem',
      name: 'CreateItem',
      component: CreateItem
    },
    {
      path: '/browseItem',
      name: 'BrowseItem',
      component: BrowseItem
    },
    {
      path: '/myListing',
      name: 'MyListing',
      component: MyListing
    }
  ]
})
