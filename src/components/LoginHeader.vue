<template>
    <div class="LoginHeader">
        <nav class="navbar" id="bootstrapPaddingOverwrite">
            <div class="navbar-header">
                <router-link to="/" class="nav-link" id="HeaderLogo"><img class="logo" src="/static/images/stuffShareLogo.png">StuffShare</router-link>
                <!--<button type="button" v-on:click="testToken()">Token</button>-->
            </div>
             <ul id="marginOverwrite">
                <template v-if="!logged_in">
                    <li ><router-link to="/Login" class="nav-link" id="navBtn">Sign In</router-link></li>
                    <li ><router-link to="/Register" class="nav-link" id="navBtn">Sign Up</router-link></li>
                </template>
                <template v-else>
                    <li v-show="isAdmin"><router-link to="/admin" class="nav-link" id="navBtn">Admin Console</router-link></li>
                    <li><router-link to="/myListing" class="nav-link" id="navBtn">Lent</router-link></li>
                    <li><router-link to="/myLoan" class="nav-link" id="navBtn">Borrowed</router-link></li>
                    <li><router-link :to="profile_link" class="nav-link" id="navBtn">{{display_name}}</router-link></li>

                    <li><div class="dropdown">
                        <button class="btn btn-secondary" type="button" id="notificationListButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-bell" aria-hidden="true" /> <span class="badge badge-danger" v-show="notification_count>0">{{notification_count}}</span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="notificationListButton" style="position: absolute; z-index: 1000">
                            <div v-if="notifications.length === 0" class="container notification list-group-item">
                                No notifications
                            </div>
                            <div v-else>
                                <div v-for = "notification in notifications" >
                                    <notification
                                        :iid = "notification.iid"
                                        :notiType = "notification.type"
                                        :isRead = "notification.isread"
                                        :nid = "notification.nid"
                                        :name = "notification.name"></notification>
                                </div>
                            </div>
                        </div>
                    </div></li>

                    <li><button type="button" class="btn btn-danger" v-on:click="logout()">Sign Out</button></li>
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
            isAdmin: auth.isUserAdmin(this),
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
            this.isAdmin = auth.isUserAdmin(this)
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
            console.log("Getting noti")
            this.$http.get(api_url_noti+api_noti_owner+auth.getUsername(this))
            .then(response => {
                this.notifications = response.data;
                this.notification_count = 0;
                for(var i = 0; i < this.notifications.length; i++) {
                    if(!this.notifications[i].isread) {
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
    },
    created: function () {
        this.getnoti();

        setInterval(function () {
            this.getnoti(); 
        }.bind(this), 5000); 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.notification {
    width:300px;
    font-size:10pt;
    letter-spacing:0px;
}

#HeaderLogo {
  font-family: 'Roboto';
  font-size: 20px;
  letter-spacing: 0px;
  color: #666;
}

#navBtn {
  letter-spacing: 1px;
  font-size:16px;
  color: #666;
}

#navBtn:hover {
  background-color: #EFEFEF;
  color: #222;
}

#bootstrapPaddingOverwrite {
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: white;
  border-bottom: 1px;
  border-bottom-color: #CCC;
}

#marginOverwrite {
  margin: 0px;
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
  color: #666;
  display: block;
  line-height: 56px;
  padding: 0;
  text-decoration: none;
  text-align: center;
}

.dropdown-menu {
    right: 0;
    left: auto;
    padding:0px;
    max-height: 400px;
    overflow-y: auto;
}

.logo {
  width:40px;
}
</style>
