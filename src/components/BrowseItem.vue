<template>
<div class="browseItem">
	<h1>Browse Item</h1>
	<div class="row justify-content-center">
		<div class="searchBar input-group col-10" @keyup.enter="search(searchQuery)">
		    <input class="form-control" name="query"  v-model="searchQuery" placeholder="Search for items">
		    <span class="input-group-btn">
		    	<button class="btn btn-secondary" type="button" v-on:click="search(searchQuery)">Go!</button>
		    </span>
		</div>
    </div>
    <div class="row justify-content-center">
    	<browseFilter></browseFilter>
    </div>
    <itemgrid :items = "items"></itemgrid>
    <br/>
    <!--<div><pre>data: {{$data}}</pre></div>	-->
</div>
</template>

<script>
import api_ep from '../api.json'
import ItemGrid from './ItemGrid'
import BrowseFilter from './Filter'

var api_url = api_ep.API_URL + api_ep.ITEMS
var api_url_search = api_ep.API_URL + api_ep.ITEMS + "?name_like="
export default {
  name: 'BrowseItem',
  components: {
    'itemgrid' : ItemGrid,
    BrowseFilter
  },
  data () {

    return {
    	searchQuery: '',
    	items: []

    }
  },
  methods: {
  	search (query){
	    this.$http.get(api_url_search + query)
	      .then(response => {
	        this.items = response.data;
	        console.log("Searching for : " + query);
	      });
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
    margin-top: 15px;
}

.item{
	margin:10px;
	display: inline-block;
}

.itemRow{
	display: inline-block;
}

.searchBar{
}
</style>
