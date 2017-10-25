<template>
<div class='itemgrid'>
  <div class="itemRow" v-for = "item in items">
  	<div class="item">
  	<itemsquare
  	  :iid = "item.iid"
      :name = "item.name"
      :owner = "item.owner_username"
      :price = "item.minbid"
      :image = "retrieveImageUrl(item.imagesrc)"></itemsquare>
  	</div>
  </div>  
</div>
</template>

<script>
import api_ep from '../api.json'
import ItemSquare from './ItemGridSquare'
var api_url = api_ep.API_URL + api_ep.IMAGE + '/'
export default {
  name: 'ItemGrid',
  components: {
    'itemsquare' : ItemSquare,
  },
  props: ['items'],
  data () {

    return {
      image: '/static/images/book.png'

    }
  },
  methods: {
    retrieveImageUrl(source){
      var itemImage = api_url+source;
      console.log(source);
      return itemImage;
    }
  } ,
  created: function () {
  }
  /*,
  watch: {
    items: function (val) {
      this.updateSource(val);
    }
  }*/
}
</script>

<style scoped>

.item{
	margin:10px;
	display: inline-block;
}

.itemRow{
	display: inline-block;
}
</style>
