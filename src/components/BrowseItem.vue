<template>
<div class="browseItem">
	<h1>Browse Item</h1>
	<form id="search">
    <input class="form-control" name="query"  v-model="searchQuery" aria-describedby="searchHelp" placeholder="Search for items">
    <small id="searchHelp" class="form-text text-muted">Search for items listed by other users here</small>
    </form>	
    <br/>
    <div class="row">
    	<div class="">
    	<itemsquare
	      :name="name"
	      :owner='owner'
	      :price= 'price'
	      :image="image"></itemsquare>
    	</div>
    	<div class="">
    	<itemsquare
	      :name="name"
	      :owner='owner'
	      :price= 'price'
	      :image="image"></itemsquare>
    	</div>
    </div>
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

</style>