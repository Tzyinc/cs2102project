<template>
<div class="itemsquare">
	<div class='image'>
		<img :src="image">
	</div>
	<div class='info'>
		<div class='name'>{{name}}</div>
		<div class='owner'>{{owner}}</div>
		<div class='price'>{{price}}</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'ItemSquare',
  props: ['name', 'owner', 'price', 'image'],
  data () {
    return {
    }
  },
  methods: {
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
    border-width: 5px;
    overflow:hidden;
    /*background-color: red;*/
    display: inline-block;
    padding-bottom: 5px;
    border-radius: 1em;
}
.image{
	/*background-color: blue;*/
	width :100%;
	height: 150px;
	background-size: auto 100%;
	padding-top: 5px;
}
.name{
	padding-left: 10px;
	padding-bottom: 5px;
	width:90%;
	text-align:left;
	/*background-color: green;*/

}
.owner{
	padding-left: 10px; 
	width:40%;
	float:left;
	text-align:left;
	font-size: smaller;
	/*background-color: yellow;*/
}
.price{
	padding-right: 10px;
	width:40%;
	float:right;
	text-align:right;
	/*background-color: pink;*/
	font-family: 'DIN_Medium'; 
}
</style>