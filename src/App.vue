<template>
  <div class="container" id="app">
    <!-- <img src="./assets/logo.png"> 
	<UserSelection v-on:sourceChanged="sourceChanged"></UserSelection>
  <Userlist v-bind:source="source"></Userlist>-->
  <UserList></UserList>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import UserList from './components/UserList'


export default {
  name: 'app',
  components: {
    UserList,
  },
  data () {
    /* {
      source: ""
    }*/
  },
  methods: {
    /*sourceChanged: function (source) {
      this.source = source;
    }*/
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
