import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Registration from '@/components/Registration.vue'
import Login from '@/components/Login.vue'
import DetailedItem from '@/components/DetailedItem.vue'
import CreateItem from '@/components/CreateItem.vue'
import UpdateItem from '@/components/UpdateItem.vue'
import BrowseItem from '@/components/BrowseItem.vue'
import MyListing from '@/components/MyListing.vue'
import MyLoan from '@/components/MyLoan.vue'
import MyProfile from '@/components/MyProfile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/browseItem',
      name: 'BrowseItem',
      component: BrowseItem,
      props: route => ({page: parseInt(route.query.page)})
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
      name: 'DetailedItem',
      component: DetailedItem
    },
    {
      path: '/createItem',
      name: 'CreateItem',
      component: CreateItem
    },
    {
      path: '/updateItem/:iid',
      name: 'UpdateItem',
      component: UpdateItem,
      props: true
    },
    {
      path: '/myListing',
      name: 'MyListing',
      component: MyListing
    },
    {
      path: '/myLoan',
      name: 'MyLoan',
      component: MyLoan
    },
    {
      path: '/user/:uid',
      name: 'MyProfile',
      component: MyProfile,
      props: true
    }
  ]
})
