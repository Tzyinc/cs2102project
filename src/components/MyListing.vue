<template>
<div class="myListing">
	<h1>My Listing</h1>
  <!--
	<div class="input-group">
    <input class="form-control" name="query"  v-model="searchQuery" placeholder="Search for items">
    <span class="input-group-btn">
    	<button class="btn btn-secondary" type="button" v-on:click="search(searchQuery)">Go!</button>
    </span>

  </div>	
  -->
  <div class="createButton">
    
    <button type="button" class="btn btn-info" v-on:click="go_to_create()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Create New Listing</button>
  </div>
   <br/>
  <br/>
  <div class="itemRow" v-for = "item in items">
    <div class="item"> 
    	<itemsquare
    	  :iid = "item.iid"
	      :name="item.name"
	      :owner='item.owner_username'
	      :price= 'item.minbid'
	      :image="image"></itemsquare>
  	</div>
  </div>
  <br/>
  <!--<div><pre>data: {{$data}}</pre></div>	-->
</div>
</template>

<script>
import api_ep from '../api.json'
import ItemSquare from './ItemGridSquare'
var api_url = api_ep.API_URL + api_ep.ITEM
var api_item_owner = '?item_owner='

export default {
  name: 'MyListing',
  components: {
    'itemsquare' : ItemSquare,
  },
  data () {

    return {
    	searchQuery: '',
    	items: [],
      image: '/static/images/book.png',
      login_user: 'asdf'
    }
  },
  methods: {
    go_to_create (){
      this.$router.push('createItem')
    }
  } ,
  created: function () {
    /*Change here to get items by logged in user*/
    this.$http.get(api_url+api_item_owner+this.login_user)
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

</style>

