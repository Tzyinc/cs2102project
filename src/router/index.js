import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'
import DetailedItem from '@/components/DetailedItem.vue'
import CreateItem from '@/components/CreateItem.vue'
import BrowseItem from '@/components/BrowseItem.vue'
import MyListing from '@/components/MyListing.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/browseItem',
      name: 'BrowseItem',
      component: BrowseItem
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
      path: '/item/:iid',
      name: 'Item - book',
      component: DetailedItem
    },
    {
      path: '/createItem',
      name: 'CreateItem',
      component: CreateItem
    },
    {
      path: '/myListing',
      name: 'MyListing',
      component: MyListing
    }
  ]
})
