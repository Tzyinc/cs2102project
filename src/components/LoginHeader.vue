<template>
  <div class="LoginHeader">
    <nav class="navbar navbar-default">
      <div class="navbar-header">
        <router-link to="/">StuffShare</router-link>
        <!--<button type="button" v-on:click="testToken()">Token</button>-->
      </div>
      <ul class="nav navbar-nav navbar-right">
        <template v-if="!logged_in">
          <li><router-link to="/Login">Login</router-link></li>
          <li><router-link to="/Register">Sign Up</router-link></li>
        </template>
        <template v-else>
          <li><router-link to="/myListing">Lent</router-link></li>
          <li><router-link to="/myLoan">Borrowed</router-link></li>
          <li><router-link to="/myProfile">{{display_name}}</router-link></li>
          <li><button type="button" v-on:click="logout()">Logout</button></li>
        </template>
      </ul>
  </nav>
  </div>
</template>

<script>
import auth from '../auth/auth'
export default {
  name: 'LoginHeader',
  data () {
    return {
      logged_in: auth.isLoggedIn(this),
      display_name: auth.getUsername(this)
    }
  },

  watch: {
    // call again the method if the route changes
    '$route': 'updateLoginStatus'
  },
  
  methods: {
    updateLoginStatus() {
      //if(this.$session.exists()) {
        this.logged_in = auth.isLoggedIn(this)
        this.display_name = auth.getUsername(this)
      //} else {
      //  logged_in = false;
      //}
    },
    //testToken() {
    //  auth.testToken(this)
    //},  
    logout() {
      auth.logout(this)
      this.logged_in = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

nav {
  background-color: #cecece;
  color: #888;
  margin: 0px 0px 0px 0px;
  border: 0px;
  overflow: hidden;
  width: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
nav ul {
  display: inline-block;
  margin: 0;
  padding: 0;
}
nav ul li {
  display:inline-block;
  vertical-align:middle;
  list-style: none;
  text-align: center;
}
nav > ul > li > router-link {
  color: #aaa;
  display: block;
  line-height: 56px;
  padding: 0;
  text-decoration: none;
  text-align: center;
}
nav > ul > li:hover > router-link {
  color: rgb(255, 255, 255);
}

.navbar {
      padding-top: 15px;
      padding-bottom: 15px;
      border: 0;
      border-radius: 0;
      margin-bottom: 0;
      font-size: 12px;
      letter-spacing: 5px;
  }

</style>
