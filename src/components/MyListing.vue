<template>
<div class="myListing">
  <div class="listing-title">
	My Listing
  </div>
  <!--
	<div class="input-group">
    <input class="form-control" name="query"  v-model="searchQuery" placeholder="Search for items">
    <span class="input-group-btn">
    	<button class="btn btn-secondary" type="button" v-on:click="search(searchQuery)">Go!</button>
    </span>

  </div>
  -->
  <div class="createButton">
    <button type="button" class="btn btn-primary" v-on:click="go_to_create()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Create New Listing</button>
  </div>

  <br/>
  <br/>
  <itemgrid :items = "items"></itemgrid>
  <br/>
  <!--<div><pre>data: {{$data}}</pre></div>	-->
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'
import ItemGrid from './ItemGrid'
var api_url_items = api_ep.API_URL + api_ep.ITEMS
var api_item_owner = '?item_owner='

export default {
  name: 'MyListing',
  components: {
    'itemgrid' : ItemGrid,
  },
  data () {

    return {
    	searchQuery: '',
    	items: [],
      login_user: ''
    }
  },
  methods: {
    go_to_create (){
      this.$router.push('createItem')
    }
  } ,
  created: function () {
    /*Change here to get items by logged in user*/
    if(!auth.isLoggedIn(this)){
      this.$router.push('/')
    }
    this.login_user = auth.getUsername(this)
    this.$http.get(api_url_items+api_item_owner+this.login_user)
      .then(response => {
        this.items = response.data;
        console.log(this.items);
      });
  }
}
</script>

<style scoped>
.myListing{
    margin: 0 auto;
    text-align: center;
}

.myListing h1{
    margin-top: 20px;
}

.item{
	margin:10px;
	display: inline-block;
}

.itemRow{
	display: inline-block;
}

.createButton{
  float: right;
  margin-right: 50px;
}

.listing-title{
  font-weight:bold;
  font-size: 2em;
  padding-top: 2%;
  padding-bottom: 1%;
}
</style>
