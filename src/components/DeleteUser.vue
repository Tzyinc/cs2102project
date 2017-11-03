<template>
<div class="list-group-item deleteUser" v-bind:class="{ active: !read }" v-on:click="goToItem(uid)">
	<div>
    	Failed bid on '{{name}}'
    </div>
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'
var api_url_noti = api_ep.API_URL + api_ep.NOTIFICATION;
var api_noti_owner = '?username=';
var api_notiId = '?nid=';

export default {
	name: 'Notification',
  	props: ['uid', 'name'],
 	 data () {
    	return {
    		read : ''
    	}
  	},
  	methods: {
  		markNotiRead (notiId, read) {
        	if(!this.read) {
        		this.read = true;

	        	$.ajax({
	                url: api_url_noti, //Your api url
	                type: 'POST', //type is any HTTP method
	                headers: auth.getAuthHeader(this),
					data: {data: {"nid": notiId}},
	                success: function(response){
	                    if(response.success) {
	                		console.log("Notification mark as read")
	            		}
	                }
	            })
	        }

    	},
    	goToItem(iid) {
    		this.$router.push({ name: 'DetailedItem', params: { iid: iid }})
    	}
  	},
  	watch: {
  		isRead: function(newVal, oldVal) { // watch it
	      	this.read = newVal
   		}
  	},
		created: function() {
			this.read = this.isRead
		}
}
</script>

<style>

.notification {
    width:300px;
    font-size:10pt;
    letter-spacing:0px;
}

</style>
