<template>
<div class="createItem">
	<h1>Create Item</h1>
	<form id="itemForm">
		
		<!-- Name -->
		<div class="formRow">
			<label for="name">Name: </label>
			<input class="name form-control" type="text" v-model="name" placeholder="Item Name" >
		</div>
		<!-- Desc -->
		<div class="formRow">
			<label for="desc">Description: </label>
			<textarea class="desc form-control" v-model="description" rows="5" placeholder="Description of Item"></textarea>
		</div>
		<!-- Image -->
		<div class="formRow">
			<label for="image">Image: </label>
			<input class="image form-control" type="text" v-model="imageSrc" placeholder="Image link">
		</div>
		<!-- Tags -->
		<div class="formRow">
			<label for="tag">Tags: </label>
			<input class="tag form-control" type="text" v-model="tags" placeholder="Tags">
		</div>
		<!-- Min Price -->
		<div class="formRow">
			<label for="minbid">Minimum Price: </label>
			<input class="minbid form-control" v-model="minBid" number placeholder="1.50">
		</div>
		<!-- Location -->
		<div class="formRow">
			<label for="location">Location: </label>
			<input class="location form-control" type="text" v-model="location" placeholder="Kent Ridge">
		</div>
		<!-- Availability -->
		<div class="formRow">
			<label for="avail">Availability: </label>
			<input class="avail form-control" type="date" v-model="startdate" placeholder="01-10-2017">
			<input class="avail form-control" type="date" v-model="enddate" placeholder="11-10-2017"> 
			
		</div>
		<br/>
		<div class="formRow" >
			<label></label>
			<button type="button" class="btn btn-secondary" v-on:click="cancel()">Cancel</button>
			<button type="button" class="btn btn-primary" v-on:click="submit($data)">Submit</button>
		</div> 
        
	</form>
			<!--<div><pre>data: {{$data | json 2}}</pre></div>-->
			
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'

var api_url = api_ep.API_URL + api_ep.ITEM

export default {
  name: 'CreateItem',
  data () {

    return {
    	owner_username   : '',
	    name     : '',
	    description     : '',
	    imageSrc : '',
	    tags     : '',
	    minBid   : 0.99,
	    location : '',
	    startdate   : '',
	    enddate   : '',
	    status   : true
    }
  },
  methods: {
	submit (formData) {
		var context = this
  		$.ajax({
    	url: api_url, //Your api url
     	type: 'PUT', //type is any HTTP method
     	data: {data: formData}, //Data as js object
     	success: function(response){
	        console.log('submit')
	        if(response.hasOwnProperty('success')){
	        	alert("Successfully created item:\n" + formData.name)
	        	context.$router.push('myListing')
	        	//redirect(this)
			} else{
				alert("Failed to submit.\nPlease try again.")
			}
		}
    	})
  	}, 
  	cancel (){
  		this.$router.push('myListing')
  	}
  },
  created: function () {
    /*Change here to get items by logged in user*/
    this.owner_username = auth.getUsername(this);

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
	margin-top: 20px;
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
	margin-top: 20px;
}
</style>