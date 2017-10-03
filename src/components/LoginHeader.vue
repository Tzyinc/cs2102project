<template>
  <div class="LoginHeader">
    <nav class="navbar navbar-default">
      <div class="navbar-header">
      <router-link to="/">StuffShare</router-link>
      </div>
      <ul class="nav navbar-nav navbar-right">
        <li><router-link to="/Login">Login</router-link></li>
        <li><router-link to="/Register">Sign Up</router-link></li>
      </ul>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'LoginHeader',
  data () {
      return{

      }
    /* {
      source: ""
    }*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

nav {
  background-color: #cecece;
  color: #888;
  margin: 0px 0px 0px 0px;
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
