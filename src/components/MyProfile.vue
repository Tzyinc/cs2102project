<template>
<div class="myPage">
	<div class="container profile">
    <div class="row cover">
        <div class="cover"></div>
        <div><h1 class="displayName">{{login_user}}</h1></div> 
    </div>
    <div class="row profileNav">

    </div>
    <div class="row">
       <div class="col-sm-4"><div class="displayPic"><img :src="profile_pic"></div></div>
    </div>
    <div class="row editBtn">
      <button type="button">Edit Profile</button>
    </div>
  </div>
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
      login_user : '',
      profile_pic : '/static/images/default_profile.jpg'
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

.displayPic {
  width: 220px;
  height: 220px;
  overflow: hidden;
  position: relative;
  margin-left: 5px;
  margin-top: -235px;
  margin-bottom: 30px;
}

.displayPic img {
    height:100%;
    position: absolute;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;
}

.displayName {
    text-transform: capitalize;
    color:white;
    top: 140px;
    left: 275px;
    position: relative;    
}

.cover {
  background-color: black;
  height:205px;
}

.profileNav {
  height:45px;
  background-color: #EEEEEE;
}

.editBtn {
  float: right;
  margin-top: -250px;
  margin-right: 2px;
}

</style>

