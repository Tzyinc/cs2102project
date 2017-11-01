<template>
<div class="itemsquare" v-on:click="load(iid)">
	<div id='image'>
		<img class="" :src="image">
	</div>
	<div class='info'>
		<div id='name'>{{name}}</div>
		<div class="alert-light" id='owner'>{{owner}}</div>
		<div id='price'>${{price}}</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'ItemSquare',
  props: ['iid','name', 'owner', 'price', 'image'],
  data () {
    return {
    }
  },
  methods: {
  	load (iid){
  		this.$router.push({ name: 'DetailedItem', params: { iid: iid }})
  	}
  } 
}
</script>

<style scoped>

img {
	min-width: 100%;
    height: 100%;
    margin: 0px;

    object-fit: fill;
}

.itemsquare{
	width: 200px;
	min-height: auto;
	border: 3px solid lightgrey;
    overflow:hidden;
    background-color: rgba(235, 235, 235, 0.9);
    display: inline-block;
    padding-bottom: 1px;
    border-radius: 0.75em;
}

.itemsquare:hover {
	border-color: black;
}

#image{
	width :206px;
	height: 150px;
	background-color: white;
	background-size: auto 100%;
	padding: 2px 0px 0px 2px;
	margin: -5px 0px 0px -5px;
	overflow: hidden;
  	position: relative;
  	object-fit: 
}
#name{
	padding-top: 2px;
	padding-left: 10px;
	padding-bottom: 5px;
	width:90%;
	text-align:left;
	/*background-color: green;*/

}
#owner{
	padding-left: 10px; 
	width:40%;
	float:left;
	text-align:left;
	font-size: smaller;
	background-color: rgba(235, 235, 235, 0.9);
	/*background-color: yellow;*/
}
#price{
	padding-right: 10px;
	width:40%;
	float:right;
	text-align:right;
	/*background-color: pink;*/
	font-family: 'DIN_Medium'; 
}
</style>