<template>
    <div class="LoginHeader">
        <nav class="navbar navbar-dark bg-dark" id="bootstrapPaddingOverwrite">
            <div class="navbar-header">
                <router-link to="/" class="nav-link"><h4>StuffShare</h4></router-link>
                <!--<button type="button" v-on:click="testToken()">Token</button>-->
            </div>
             <ul class="nav navbar-nav navbar-right">
                <template v-if="!logged_in">
                    <li><router-link to="/Login" class="nav-link">Login</router-link></li>
                    <li><router-link to="/Register" class="nav-link">Sign Up</router-link></li>
                </template>
                <template v-else>
                    <li><router-link to="/myListing" class="nav-link">Lent</router-link></li>
                    <li><router-link to="/myLoan" class="nav-link">Borrowed</router-link></li>
                    <li><router-link :to="profile_link" class="nav-link">{{display_name}}</router-link></li>
                    
                    <li><div class="dropdown">
                        <button class="btn btn-secondary" type="button" id="notificationListButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Notifications <span class="badge badge-danger">3</span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="notificationListButton" style="position: absolute; z-index: 1000">
                            <div v-for = "notification in notifications"class="list-group-item notification" v-bind:class="{ active: notification.read }">
                                <div>{{notification.type}}</div>
                            </div>
                        </div>
                    </div></li>

                    <li><button type="button" class="btn btn-dark" style="border-color:#1d2124" v-on:click="logout()">Logout</button></li>
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
        profile_link: "/user/" + auth.getUsername(this),
        display_name: auth.getUsername(this),
        notifications: [{type:"This is a notification", read:true}, {type:"This is the second notification", read:false},
        ]
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
        this.profile_link = "/user/" + auth.getUsername(this)
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

#bootstrapPaddingOverwrite {
  padding-top: 3px;
  padding-bottom: 3px;
}

nav {
  background-color: #cecece;
  color: #888;
  margin: 0px 0px 0px 0px;
  border: 0px;
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
  font-size: larger;
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

.dropdown-menu {
    right: 0; 
    left: auto; 
    padding:0px;
    max-height: 400px;
    overflow-y: auto;
}

.notification {
    width:300px;
    font-size:10pt;
    letter-spacing:0px;
}

.unread {
    background-color: #CCC
}

.navbar {
      padding-top: 15px;
      padding-bottom: 15px;
      border: 0;
      border-radius: 0;
      margin-bottom: 0;
      font-size: 12px;
      background-color: ;
      letter-spacing: 5px;
  }

</style>
