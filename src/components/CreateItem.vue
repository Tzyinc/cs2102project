<template>
<div class="createItem">
	<h1>Create an Item</h1>
	<form id="itemForm">
		
		<!-- Name -->
		<div class="formRow">
			<label for="name">Name: </label>
			<input class="name" type="text" v-model="name">
		</div>
		<!-- Desc -->
		<div class="formRow">
			<label for="desc">Description: </label>
			<textarea class="desc" v-model="desc" rows="5">{{desc}}</textarea>
		</div>
		<!-- Image -->
		<div class="formRow">
			<label for="image">Image: </label>
			<input class="image" type="text" v-model="image">
		</div>
		<!-- Tags -->
		<div class="formRow">
			<label for="tag">Tags: </label>
			<input class="tag" type="text" v-model="tags">
		</div>
		<!-- Min Price -->
		<div class="formRow">
			<label for="minbid">Minimum Price: </label>
			<input class="minbid" v-model="minbid" number>
		</div>
		<!-- Location -->
		<div class="formRow">
			<label for="location">Location: </label>
			<input class="location" type="text" v-model="location">
		</div>
		<!-- Availability -->
		<div class="formRow">
			<label for="avail">Availability: </label>
			<input class="avail" type="date" v-model="availF">
			<input class="avail" type="date" v-model="availT">
			
		</div>
		<div class="formRow">
			<label></label><button type="">Cancel</button>
			<button type="">Submit</button>
		</div> 
        
	</form>
			<div><pre>data: {{$data | json 2}}</pre></div>
</div>
</template>

<script>
export default {
  name: 'CreateItem',
  data () {
    return {
	    name    : 'Item Name',
	    desc    : 'Description of Item',
	    image   : 'Image link',
	    tags    : 'tags',
	    minbid  : 1.50,
	    location: 'Kent Ridge',
	    availF   : '11-10-2017',
	    availT   : '11-11-2017'
    }
  },
  methods: {
  } 
}
</script>

<style scoped>
.createItem{
	width: 500px;
    margin: 0 auto;
    text-align: center;
}

.createItem input, textarea{
	width : 80% ;
	display: block;
	vertical-align: top;
	margin-bottom: 5px;
	margin-right: 5px;
	overflow: hidden;
}

#itemForm{
	/*border: 1px solid #CCC;
	border-radius: 1em;*/
	display: table;
	border-spacing:1em;
	border-collapse: collapse;
	text-align: center;
	width: 100%;
}

.formRow{
	width: 100%;
	display: table-row;
	text-align: center;

}

.createItem label{
	width: 30%;
	display: table-cell;
	vertical-align: top;
	text-align: right;
	padding-right: 10px;
}

.createItem button{
	width: 30%;
	margin-left: 10px;
	display: block;
	vertical-align: middle;
	float: left;
	text-align: center;
}

.createItem h1{
	width : 100%;
	vertical-align:middle;
}
</style>