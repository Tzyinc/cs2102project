<template>
<div class="myPage">
	<h1>My Page</h1>
  Hello {{login_user}}!
  <br/>
  <!--<div><pre>data: {{$data}}</pre></div>	-->
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'


export default {
  name: 'MyProfile',
  components: {

  },
  data () {

    return {
      login_user : ''
    }
  },
  methods: {

  } ,
  created: function () {
    /*Change here to get items by logged in user*/
    if(!auth.isLoggedIn(this)){
      this.$router.push('/')
    }
    this.login_user = auth.getUsername(this)

  }
}
</script>

<style scoped>
.myPage{
    margin: 0 auto;
    text-align: center;
}

.myPage h1{
    margin-top: 20px;
}

</style>

