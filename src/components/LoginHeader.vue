<template>
  <div class="LoginHeader">
    <nav>
  <ul>
    <li>
      <h1><router-link to="/">Stuff Share</router-link></h1>
    </li>
    <li><router-link to="/Login">Sign in</router-link>
    </li>
    <li><router-link to="/Register">Sign up</router-link>
    </li>
    <li><router-link to="/item/placeholderstringfornow">Detailed Item</router-link>
    </li>
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
  background-color: #000000;
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

</style>
