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
  background-color: #efefef;
}
html, body {
    height:100%;
}
.container-fluid {
     padding-right: 0; /*15px in bootstrap.css*/
     padding-left: 0;  /*idem*/
     margin-right: auto;
     margin-left: auto;
}
</style>
