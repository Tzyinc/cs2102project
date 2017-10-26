<template>
<div class="myPage">
    <div class="container profile">
        <div class="row cover">
            <div class="cover"></div>
            <div><h1 class="displayName">{{profile_owner}}</h1></div> 
        </div>
        <div class="row profileNav">

        </div>
        <div class="row">
            <div class="displayPic"><displaypic :oldImage="displayPic.imageSrc" @changed="loadImage"></displaypic></div>
        </div>
        <div>
            <div class="rating">
                <div class="input-group">
                    <span class="input-group-addon" style="background-color:#BBB">Rating</span>
                    <span class="input-group-addon" style="background-color:#EEE">{{rating}}</span>
                </div>
              </div>
        </div>

        <div class="row spacer"></div>

        <!--class container is to get the freaking listings word to center, bloody bootstrap-->
        <div class="row listingHeader"><div class="container">Listings</div></div>
        <div class="row listing">
            <div v-if="items.length === 0" class="container">
                {{profile_owner}} has no listings
            </div>
            <div v-else>
                <itemgrid :items = "items"></itemgrid>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'
import DisplayPic from './DisplayPic'
import ItemGrid from './ItemGrid'
var api_url_userDetails = api_ep.API_URL + api_ep.USER + '?username=';
var api_url_items = api_ep.API_URL + api_ep.ITEMS
var api_item_owner = '?item_owner='

export default {
    name: 'MyProfile',
    components: {
        'displaypic' : DisplayPic,
        'itemgrid' : ItemGrid
    },
    data () {
        return {
            login_user : '',
            profile_owner: '',
            displayPic: {
              imageSrc: '',
              imageBin: ''
            },
            rating : '?',
            empty : '',
            isSelf : false,
            items: [],
            profile_pic : '/static/images/default_profile.jpg'
        }
    },
    methods: {
        loadImage(value){
            this.displayPic.imageSrc = value.name
            this.displayPic.imageBin = value.image
        }
    },
    created: function () {
        /*Change here to get items by logged in user*/
        if(!auth.isLoggedIn(this)){
            this.$router.push('/')
        }
        this.login_user = auth.getUsername(this)

        this.$http.get(api_url_userDetails + this.login_user)
          .then(response => {
            var userInfo = response.data;
            this.profile_owner = userInfo.username;
            this.description = userInfo.imagesrc;
            this.rating = userInfo.userrating;
            if(auth.getUsername(this) == userInfo.username){
                //For visiting other people's profile
                console.log("Is mine")
                this.isSelf = true;
            }
        });

        this.$http.get(api_url_items+api_item_owner+this.login_user)
        .then(response => {
            this.items = response.data;
        });
    }
}
</script>

<style scoped>
.myPage{
    margin: 0 auto;
    text-align: center;
}

.rating {
    margin-top: -250px;
    margin-right: 5px;
    float:right;
    color: white;
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
    background-color: #AAA;
    border-radius: 5px 5px 0px 0px;
    border: 1px inset #AAA;
}

.listing {
    background-color: #EEEEEE;
    border-radius: 0px 0px 5px 5px;
    border: 1px inset #AAA;
}

</style>

