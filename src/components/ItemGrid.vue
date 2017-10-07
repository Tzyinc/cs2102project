<template>
<div class='itemgrid'>
  <div class="itemRow" v-for = "item in items">
  	<div class="item">
  	<itemsquare
  	  :iid = "item.iid"
      :name = "item.name"
      :owner = "item.owner_username"
      :price = "item.minbid"
      :image = "image"></itemsquare>
  	</div>
  </div>  
</div>
</template>

<script>
import api_ep from '../api.json'
import ItemSquare from './ItemGridSquare'

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
  } ,
  created: function () {
  }
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
