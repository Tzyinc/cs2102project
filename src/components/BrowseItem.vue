<template>
<div class="browseItem">
	<h1>Browse Item</h1>
	<div class="input-group">
    <input class="form-control" name="query"  v-model="searchQuery" placeholder="Search for items">
    <span class="input-group-btn">
    	<button class="btn btn-secondary" type="button" v-on:click="search(searchQuery)">Go!</button>
    </span>

    </div>	
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
    <div><pre>data: {{$data}}</pre></div>	
</div>
</template>

<script>
import api_ep from '../api.json'
import ItemSquare from './ItemGridSquare'
var api_url = api_ep.API_URL + api_ep.ITEM

export default {
  name: 'BrowseItem',
  components: {
    'itemsquare' : ItemSquare,
  },
  data () {

    return {
    	searchQuery: '',
    	items: [{
    		name: 'Book',
        	owner: 'tom',
     		price: 5.5,
      		image: '/static/images/book.png'
    	}],
		name: 'Book',
        owner: 'tom',
     	price: 5.5,
      	image: '/static/images/book.png'

    }
  },
  methods: {
  	search (query){
  		alert("Searching for ...\n" + query)
  	}
  } ,
  created: function () {
    this.$http.get(api_url)
      .then(response => {
        this.items = response.data;
        console.log(this.items);
      });
  }
}
</script>

<style scoped>
.browseItem{
    margin: 0 auto;
    text-align: center;
}

.browseItem h1{
    margin-top: 20px;
}

.item{
	margin:10px;
	display: inline-block;
}

.itemRow{
	display: inline-block;
}
</style>

