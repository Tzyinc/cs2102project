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

.itemsquare{
	width:200px;
	min-height: auto;
	border-style: solid;
    border-width: 5px;
    overflow:hidden;
    /*background-color: red;*/
    display: inline-block;
    padding-bottom: 5px;
}
.image{
	/*background-color: blue;*/
	height: 150px;
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