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
			<input class="image" type="text" v-model="imageSrc">
		</div>
		<!-- Tags -->
		<div class="formRow">
			<label for="tag">Tags: </label>
			<input class="tag" type="text" v-model="tags">
		</div>
		<!-- Min Price -->
		<div class="formRow">
			<label for="minbid">Minimum Price: </label>
			<input class="minbid" v-model="minBid" number>
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
			<label></label>
			<button v-on:click="cancel()">Cancel</button>
			<button v-on:click="submit($data)">Submit</button>
		</div> 
        
	</form>
			<div><pre>data: {{$data | json 2}}</pre></div>
</div>
</template>

<script>
import api_ep from '../api.json'

var api_url = api_ep.API_URL + api_ep.ITEM

export default {
  name: 'CreateItem',
  data () {

    return {
    	owner_username   : 'asdf',
	    name    : 'Item Name',
	    desc    : 'Description of Item',
	    imageSrc   : 'Image link',
	    tags    : 'tags',
	    minBid  : 1.50,
	    location: 'Kent Ridge',
	    availF   : '11-10-2017',
	    availT   : '11-11-2017',
	    status   : true,
	    api : api_url
    }
  },
  methods: {
  	submit (formData) {
  		$.ajax({
    	url: api_url, //Your api url
     	type: 'PUT', //type is any HTTP method
     	data: {data: formData}, //Data as js object
     	success: function(response){
	        console.log('submit')
	        if(response.hasOwnProperty('success')){
	        	alert("Successfully created item:\n" + formData.name)
			} else{
				alert("Failed to submit.\nPlease try again.")
			}
		}
    	})
  	}, 
  	cancel (){
  		alert("Cancelling creation")
  		location.reload()
  	}
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