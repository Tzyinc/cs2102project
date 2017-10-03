<template>
  <div class="container-fluid" id="app">
    <!-- <img src="./assets/logo.png">
	<UserSelection v-on:sourceChanged="sourceChanged"></UserSelection>
  <Userlist v-bind:source="source"></Userlist>-->
  <LoginHeader></LoginHeader>
  <router-view></router-view>
  </div>
</template>

<script>
import LoginHeader from './components/LoginHeader'

export default {
  name: 'app',
  components: {
	LoginHeader,
  },
  data () {
    return{

    }
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
  margin-top: 0px;
<<<<<<< HEAD
}
html, body {
    height:100%;
=======
>>>>>>> 35e1f7312e6428b3721fef287328b286c93232bf
}
</style>
