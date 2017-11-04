<template>
<div class="browseItem">
	<div class="browse-title">
	Browse Item
	</div>
	<div class="row justify-content-center">
		<div class="searchBar input-group col-10" @keyup.enter="search(searchQuery)">
		    <input class="form-control" name="query"  v-model="searchQuery" placeholder="Search for items">
		    <span class="input-group-btn">
		    	<button class="btn btn-outline-primary" type="button" v-on:click="search(searchQuery)">Go!</button>
		    </span>
		</div>
    </div>
    <div class="row justify-content-center">
    	<browseFilter  :sortChange = "sortChange"></browseFilter>
    </div>
    <itemgrid :items = "items"></itemgrid>
    <br/>
    <customPagination v-if="!isSearch"
    :url = "url" 
    :pageParam = "pageParam"
    :counts = "count"
    :current = "current"
    :total = "total"
    :fn = "pageChange">
      
    </customPagination>
    <!--<div><pre>data: {{$data}}</pre></div>	-->
</div>
</template>

<script>
import api_ep from '../api.json'
import ItemGrid from './ItemGrid'
import BrowseFilter from './Filter'
import CustomPagination from './CustomPagination'

var api_url = api_ep.API_URL + api_ep.ITEMS
var api_total_items = api_ep.API_URL + api_ep.ITEMCOUNT
var api_search = "?name_like="
var api_limit = "?limit="
var api_offset = "&offset="
var api_sort = "&sort="
var api_url_search = api_ep.API_URL + api_ep.ITEMS + api_search
export default {
  name: 'BrowseItem',
  components: {
    'itemgrid' : ItemGrid,
    BrowseFilter,
    'customPagination' : CustomPagination,
  },  
  props: {
    page: {
        type: Number,
        default: 1
    }
  },

  data () {

    return {
    	searchQuery: '',
    	items: [],
      url: '/',
      pageParam: 'page',
      current: 1,
      count: 5,
      total: 10,
      limit: 0,
      actualLimit: 4,
      offset: 0,
      sort: 'latest',
      isSearch: false
    }
  },
  methods: {
  	search (query){
	    this.$http.get(api_url_search + query)
	      .then(response => {
	        this.items = response.data;
	        //console.log("Searching for : " + query);
          console.log("received number of items : " + this.items.length);
          this.limit = this.items.length
          this.isSearch = true
	      });
  	},
    pageChange(d, e){
      e.preventDefault()
      console.log("page change to :", d)
      this.current = d
      this.loadItems()
    },
    loadItems(){
      //Remove searched query and back to normal
      this.searchQuery = ""
      this.limit = this.actualLimit
      this.isSearch = false

      this.getTotalItems()
      this.offset = (this.current - 1) * this.limit
      console.log("getting items of limit :"+this.limit + ", offset: " + this.offset)
      var api_load = api_url + api_limit + this.limit+api_offset+this.offset+api_sort+this.sort+api_search+this.searchQuery
      console.log(api_load)
      this.$http.get(api_load)
      .then(response => {
        this.items = response.data;
      });
    },
    getTotalItems(){
      this.searchQuery = ""
      var api = api_total_items+api_search+this.searchQuery
      console.log(api)
      this.$http.get(api)
      .then(response => {
        var totalItem = parseInt(response.data.count)
        this.total = totalItem/this.limit
        if(totalItem % this.limit > 0){
          this.total = this.total + 1
        }
      });
    },
    sortChange(d, e){
      e.preventDefault()
      this.sort = d
      this.current = 1
      this.loadItems()
    },
    setPagination(limit, visible){

    }
  } ,
  created: function () {
    console.log("page number : ", this.page)
    if(!isNaN(this.page)){
      this.current = this.page
    }
    this.loadItems()
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

.browse-title{
  font-weight:bold;
  font-size: 2em;
  padding-top: 2%;
  padding-bottom: 1%;
}
</style>
