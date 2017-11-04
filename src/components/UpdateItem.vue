<template>
<div class="updateItem">
	<div class="update-title">
	Update Item
	</div>
	<form id="itemForm">

		<!-- Name -->
		<div class="formRow">
			<label for="name">Name: </label>
			<p class="control">
				<input class="form-control has-icon has-icon-right" type="text" v-model="name" placeholder="Item Name" name="Name" v-validate="{ rules: {required: true, regex: /^[\w\-\s]+$/} }" :class="{'input': true,'is-danger': errors.has('Name')}">
				<i v-show="errors.has('Name')" class="fa fa-warning"></i>
				<span class="help text-danger" v-show="errors.has('Name')">{{ errors.first('Name') }}</span>
			</p>
		</div>
		<!-- Desc -->
		<div class="formRow">
			<label for="desc">Description: </label>
			<textarea class="desc form-control" v-model="description" rows="5" placeholder="Description of Item"></textarea>
		</div>
		<!-- Image -->
		<div class="formRow">
			<label for="image">Image: </label>
			<imageupload :oldImage="oldImage" @changed="loadImage"></imageupload>
		</div>
		<!-- Tags -->
		<div class="formRow">
			<label for="tag">Tags: </label>
			<input class="tag form-control" type="text" v-model="tagsString" placeholder="Tags">
		</div>
		<!-- Min Price -->
		<div class="formRow">
			<label for="minbid">Minimum Price: </label>
			<p class="control has-icon has-icon-right">
				<input class="minbid form-control" v-model="minBid" number placeholder="1.50" name="price"  v-validate="'required|decimal:2|between:0,1000000'" :class="{'input': true,'is-danger': errors.has('price')}">
				<i v-show="errors.has('price')" class="fa fa-warning"></i>
				<span class="help text-danger" v-show="errors.has('price')">{{ errors.first('price') }}</span>
			</p>		
		</div>
		<!-- Location -->
		<div class="formRow">
			<label for="location">Location: </label>
			<p class="control has-icon has-icon-right">
				<input class="location form-control" type="text" v-model="location" placeholder="Kent Ridge" name="Location" v-validate="{ rules: {required: true, regex: /^[\w\-\s]+$/} }" :class="{'input': true,'is-danger': errors.has('Location')}">
				<i v-show="errors.has('Location')" class="fa fa-warning"></i>
				<span class="help text-danger" v-show="errors.has('Location')">{{ errors.first('Location') }}</span>
			</p>
		</div>
		<!-- Availability -->
		<div class="formRow">

			<label for="avail">StartDate: </label>
			<datepicker input-class="avail form-control" format="dd MMMM yyyy" type="date" v-model="startdate" name="uniquename" style="margin-bottom: 5px;"></datepicker>
		</div>
		<div class="formRow">
			<label for="avail">End Date: </label>
			<datepicker input-class="avail form-control" format="dd MMMM yyyy" type="date" v-model="enddate" name="uniquename" ></datepicker>
			<i v-show="!validateDate()" class="fa fa-warning"></i>
			<span class="help text-danger" v-show="!validateDate()">{{ errorDate }}</span>
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
import Datepicker from 'vuejs-datepicker'
import ImageUpload from './ImageUpload'

var api_url = api_ep.API_URL + api_ep.ITEM + '?iid='
var api_post_url = api_ep.API_URL + api_ep.ITEM
var api_url_image = api_ep.API_URL + api_ep.IMAGE + '/'
var api_put_tags = api_ep.API_URL + api_ep.TAGS
var api_get_tags = api_ep.API_URL + api_ep.TAGS + '?iid='
export default {
  name: 'UpdateItem',
	components: {
        Datepicker,
        'imageupload' : ImageUpload
  },
  props: ['iid'],
  data () {
		var today = new Date()
		var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    return {
    	owner_username   : '',
    	name     : '',
	    description     : '',
	    imageSrc : '',
	    imageBin : '',
	    tagsString     : '',
	    tags 	 : [],
	    minBid   : 0,
	    location : '',
	    startdate   : today,
	    enddate   : tomorrow,
	    status   : true,
	    timeListed: '',
	    oldImage : '',
	   	errorDate : 'End date must be after Start Date.'

    }
  },
  methods: {
	submit (formData) {
		var context = this
		var isChildValidated = true;
		this.$validator.validateAll()
		this.$children.forEach(vm => {
		  vm.$validator.validateAll()
		  if(vm.errors.any()){
		  	isChildValidated = false;
		  	console.log("Not validated in ", vm)
		  }
		});
		if (!this.errors.any() && this.validateDate() && isChildValidated) {
			formData.iid = this.iid
	  		$.ajax({
	    	url: api_post_url, //Your api url
	     	type: 'POST', //type is any HTTP method
	     	headers: auth.getAuthHeader(this),
	     	data: {data: formData}, //Data as js object
	     	success: function(response){
		        console.log('submit update')
		        if(response.hasOwnProperty('success')){
		        	if(context.tags != null){
						context.submitTag(formData)
					}
					alert("Successfully updated item:\n" + formData.name)
		        	context.$router.push('/myListing')
				} else{
					alert("Failed to submit.\nPlease try again.")
				}
			}
			})
    	}
  	},
  	submitTag(formData){
		var context = this
	  	$.ajax({
	    	url: api_put_tags, //Your api url
	     	type: 'PUT', //type is any HTTP method
	     	headers: auth.getAuthHeader(this),
	     	data: {data: formData}, //Data as js object
	     	success: function(response){
		        console.log('submit tag')
		        if(response.hasOwnProperty('success')){

				} else{
					alert("Failed to submit.\nPlease try again.")
				}
			}
			})  		
  	},
  	cancel (){
  		this.$router.push('/myListing')
  	},
  	loadImage(value){
  		this.imageSrc = value.name
  		this.imageBin = value.image

  	},
  	validateDate(){
  		if(this.enddate<=this.startdate){
  			return false;
  		}
  		return true;
  	},
  	processTags(item){
  		item.map(x => this.tagsString = this.tagsString + "#" + x + " ")
  	}

  },
  	created: function () {
  		console.log("Loading update: ",api_url + this.iid)
	    this.$http.get(api_url + this.iid)
	      .then(response => {
	        var item = response.data;
	        this.name = item.name;
	       	this.description = item.description;
	    	this.oldImage = api_url_image+ item.itemimg;
	    	this.tags = item.tags;
	    	this.minBid = item.minbid;
	    	this.location = item.location;
	    	this.startdate = item.startdate;
	    	this.enddate = item.enddate;
	    	this.owner_username = item.owner_username;
	    	this.timeListed = item.timelisted;
	    	if(auth.getUsername(this) != item.owner_username){
		    	alert("You cannot edit this item.")
		    	this.$router.push('/myListing')
		    }
	    });
	    this.$http.get(api_get_tags + this.iid)
	      .then(response => {
	        var item = response.data;
	        this.processTags(item)
	    });	      


	},
	watch: {
    	tagsString: function (val) {
      	this.tags = val.match(/#[\w\d\s]+/gi).map(x => x.substr(1).trim()) || []
    }
  }
}
</script>

<style scoped>
.updateItem{
	width: 500px;
    margin: 0 auto;
    text-align: center;
}

.updateItem input, textarea, .avail{
	width : 100% ;
	display: block;
	vertical-align: top;
	margin-bottom: 4px;
	margin-top: 3px;
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

.updateItem label{
	width: 30%;
	display: table-cell;
	vertical-align: top;
	text-align: right;
	padding-right: 10px;
}

.updateItem button{
	width: 30%;
	margin-left: 10px;
	display: block;
	vertical-align: middle;
	float: left;
	text-align: center;
}

.updateItem h1{
	width : 100%;
	vertical-align:middle;
	margin-top: 20px;
}
.updateItem p{
	margin-bottom: 0;
}

.update-title{
  font-weight:bold;
  font-size: 2em;
  padding-top: 2%;
}
</style>
