<template>
<div class="myPage">
    <!-- Modal -->
    <div class="modal fade" id="passwordChangeModal" tabindex="-1" role="dialog" aria-labelledby="passwordChangeModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="passwordChangeModalLabel">Password Change</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
                <input
                    type="password"
                    class="form-control"
                    placeholder="Old Password"
                    v-model="credentials.oldPassword"
                    v-bind:class="{ errorBorder: wrongPassword }"
                >
            </div>
            <div class="form-group">
                <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="credentials.password"
                    v-bind:class="{ errorBorder: passwordMismatch }"
                >
            </div>
            <div class="form-group">
                <input
                    type="password"
                    class="form-control"
                    placeholder="Confirm Password"
                    v-model="confirmPassword"
                    v-bind:class="{ errorBorder: passwordMismatch }"
                >
            </div>
          </div>
          <div class="modal-footer">
            <p class="errorColor" v-bind:class="{ successColor: pwChangeSuccess }">{{pwChange_msg}}</p>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="submit()">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container profile" v-if="validProfile">
        <div class="row cover">
            <div class="cover"></div>
            <div><h1 class="displayName">{{displayPic.username}}</h1></div> 
        </div>
        <div class="row profileNav">

        </div>
        <div class="row">
            <div class="displayPic"><displaypic :oldImage="loadedProfilePic" :editPermission="isSelf" @changed="loadImage"></displaypic></div>
        </div>
        <div>
            <div class="rating">
                <div class="input-group">
                    <span class="input-group-addon" style="background-color:#BBB">Rating</span>
                    <span class="input-group-addon" style="background-color:#EEE">{{rating}}</span>
                </div>
              </div>
        </div>
        <div v-show="isSelf">
            <div class ="pwChange">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#passwordChangeModal">
                  Change password
                </button>
            </div>
        </div>

        <div class="row spacer"></div>

        <!--class container is to get the listings word to center, because of bootstrap-->
        <div class="row listingHeader"><div class="container">Listings</div></div>
        <div class="row listing">
            <div v-if="items.length === 0" class="container">
                {{displayPic.username}} has no listings
            </div>
            <div v-else>
                <itemgrid :items = "items"></itemgrid>
            </div>
        </div>
    </div>

    <div v-else>
        <h1 class="errorMsg">Error 404: User not found</h1>
    </div>
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'
import DisplayPic from './DisplayPic'
import ItemGrid from './ItemGrid'
var api_url_user = api_ep.API_URL + api_ep.USER;
var api_user_owner = '?username=';
var api_url_items = api_ep.API_URL + api_ep.ITEMS
var api_item_owner = '?item_owner='
var api_url_uimage = api_ep.API_URL + api_ep.UIMAGE + '/'

export default {
    name: 'MyProfile',
    components: {
        'displaypic' : DisplayPic,
        'itemgrid' : ItemGrid
    },
    data () {
        return {
            validProfile : false,
            login_user : '',
            displayPic: {
                username: '',
                imageSrc: '',
                imageBin: ''
            },
            loadedProfilePic: '',
            rating : '?',
            isSelf : false,
            items: [],
            
            credentials: {
                oldPassword: '',
                password: ''
            },
            confirmPassword: '',
            pwChange_msg: '',
            pwChangeSuccess: false,
            passwordMismatch: false,
            wrongPassword: false,

            profile_pic : '/static/images/default_profile.jpg'
        }
    },
    methods: {
        
        loadImage(value){
             if(this.isSelf) {
                this.displayPic.imageBin = value.image
                this.displayPic.imageSrc = value.name
                //console.log(this.displayPic.imageBin)
           
                $.ajax({
                url: api_url_user, //Your api url
                type: 'POST', //type is any HTTP method
                headers: auth.getAuthHeader(this),
                data: {data: this.displayPic}, //Data as js object
                success: function(response){
                    console.log('profile pic updated')
                }
                })
            } else {
                alert("You do not have permission to do this, please reload the page")
            }
        },
        submit() {
            if(this.isSelf) {
                var bcrypt = require('bcryptjs');
                var hash = bcrypt.hashSync(this.credentials.password, 8);
                var credentials = {
                    username: this.login_user,
                    password: hash,
                    oldPassword: this.credentials.oldPassword
                }
                if(this.confirmPassword == this.credentials.password) {
                    this.pwChange_msg = auth.changePw(this, credentials, '/')
                } else {
                    console.log('Password mismatch')
                    this.pwChange_msg = 'Passwords do not match!'
                    this.passwordMismatch = true
                    this.wrongPassword = false;
                }
            } else {
                alert("You do not have permission to do this, please reload the page")
            }
        },

        setPwChangeMsg(msg) {
          this.pwChange_msg = msg
        },

        incorrectPasswordFeedback () {
            this.wrongPassword = true
            this.passwordMismatch = false;
        },

        closePasswordChangeModal (duration, msg) {
            var context = this;
            this.pwChange_msg = msg;
            this.pwChangeSuccess = true;
            this.wrongPassword = false;
            this.passwordMismatch = false;
            setTimeout(function() {
                $('#passwordChangeModal').modal('hide');
                context.credentials.oldPassword = '';
                context.confirmPassword = '';
                context.credentials.password = '';
                context.pwChange_msg = '';
                context.pwChangeSuccess = false;
            }, duration);
        },

        populateProfilePage() {
            this.$http.get(api_url_user + api_user_owner + this.$route.params.uid)
            .then(response => {
                var userInfo = response.data;
                if(!(userInfo.username == '' || userInfo.username == null)) {
                    this.validProfile = true;
                    this.displayPic.username = userInfo.username;
                    //console.log(userInfo.username);
                    if(userInfo.imagesrc == '' || userInfo.imagesrc == null) {
                        this.loadedProfilePic = '';    
                    } else {
                        this.loadedProfilePic = api_url_uimage + userInfo.imagesrc;
                    }
                    
                    this.rating = userInfo.userrating;
                    if(auth.getUsername(this) == userInfo.username){
                        //For visiting other people's profile
                        this.isSelf = true;
                    }
                } else {
                    //For profile to profile jump
                    this.validProfile = false;
                }
            });

            this.$http.get(api_url_items+api_item_owner+this.$route.params.uid)
            .then(response => {
                this.items = response.data;
            });
        }
    },
    created: function () {
        this.login_user = auth.getUsername(this)
        this.populateProfilePage()
    },
    watch: { 
        '$route': 'populateProfilePage'
    }
}
</script>

<style scoped>
.errorBorder {
    border-color: red;
}

.errorColor {
    width:100%;
    align:left;
    color:red;
}

.successColor {
    color:green;
}

.errorMsg {
    margin-top: 40px;
}

.myPage {
    margin: 0 auto;
    text-align: center;
}

.rating {
    margin-top: -250px;
    margin-right: 5px;
    float:right;
    color: white;
    z-index: 500;
}

.pwChange {
    margin-top: -120px;
    margin-right: 8px;
    float:right;
    color: white;
    position:relative;
}

.displayPic {
  width: 220px;
  height: 220px;
  overflow: hidden;
  position: relative;
  margin-left: 15px;
  margin-top: -235px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
  border: 1px inset #AAA;
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
  opacity: 0.8;
  filter: alpha(opacity=80);
}

.profileNav {
    height:45px;
    background-color: #EEEEEE;
    border-radius: 0px 0px 5px 5px;
    border: 1px inset #AAA;
}

.spacer {
    height:5px;
}

.listingHeader {
    background-color: #BBB;
    border-radius: 5px 5px 0px 0px;
    border: 1px inset #AAA;
}

.listing {
    background-color: #EEEEEE;
    border-radius: 0px 0px 5px 5px;
    border: 1px inset #AAA;
}

</style>

