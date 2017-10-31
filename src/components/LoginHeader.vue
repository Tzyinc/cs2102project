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
                            Notifications <span class="badge badge-danger" v-show="notification_count>0">{{notification_count}}</span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="notificationListButton" style="position: absolute; z-index: 1000">
                            <div v-if="notifications.length === 0" class="container notification">
                                No notifications
                            </div>
                            <div v-else>
                                <div v-for = "notification in notifications" >
                                    <notification
                                        :iid = "notification.iid"
                                        :notiType = "notification.type"
                                        :isRead = "notification.isRead"
                                        :nid = "notification.nid"></notification>
                                </div>
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
import api_ep from '../api.json'
import Notification from './Notification'
var api_url_noti = api_ep.API_URL + api_ep.NOTIFICATION;
var api_noti_owner = '?username=';
var api_notiId = '?nid=';

export default {
    name: 'LoginHeader',
    components: {
        'notification' : Notification
    },
    data () {
        return {
            logged_in: auth.isLoggedIn(this),
            profile_link: "/user/" + auth.getUsername(this),
            display_name: auth.getUsername(this),
            notifications: [],
            notification_count: 0
        }
    },

    watch: {
        // call again the method if the route changes
        '$route': 'updateLoginStatus'
    },

    methods: {
        updateLoginStatus() {
            this.logged_in = auth.isLoggedIn(this)
            this.display_name = auth.getUsername(this)
            this.profile_link = "/user/" + auth.getUsername(this)
            if(this.logged_in) {
                this.getnoti()
            }
        },

        logout() {
          auth.logout(this)
          this.logged_in = false;
        },

        //Get noti is triggered from auth.js, after login is confirmed
        getnoti () {
            this.$http.get(api_url_noti+api_noti_owner+auth.getUsername(this))
            .then(response => {
                this.notifications = response.data;
                this.notification_count = 0;
                for(var notification in this.notifications) {
                    if(!notification.isRead) {
                        this.notification_count++;
                    }
                }
            });
        },

        reduceNotiCount() {
            if(this.notification_count > 0) {
                this.notification_count--;
            }
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
  
h4{
  margin-bottom: 0;
}
</style>
