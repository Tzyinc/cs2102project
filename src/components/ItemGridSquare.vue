<template>
<div class="itemsquare" v-on:click="load(iid)">
	<div id='image'>
		<img class="img-thumbnail" :src="image">
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
    max-width: 100%;
    max-height: 100%;
}
.itemsquare{
	width:200px;
	min-height: auto;
	border-style: solid;
    border-width: 4px;
    overflow:hidden;
    /*background-color: red;*/
    display: inline-block;
    padding-bottom: 1px;
    border-radius: 1em;
}
.itemsquare:hover {
	border-color: grey;
}
#image{
	/*background-color: blue;*/
	width :100%;
	height: 150px;
	background-size: auto 100%;
	padding: 5px 5px 0px 5px;

}
#name{
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