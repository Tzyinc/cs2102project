<template>
<div class="list-group-item notification" v-bind:class="{ active: !read }" v-on:mouseover="markNotiRead(notificationid, isRead)">
	<div v-if="type='bidMade'">
        New bid on '{{iid}}'
    </div>
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'
var api_url_noti = api_ep.API_URL + api_ep.NOTIFICATION;
var api_noti_owner = '?username=';
var api_notiId = '?notificationID=';

export default {
	name: 'Notification',
  	props: ['iid', 'type', 'isRead','notificationid'],
 	 data () {
    	return {
    		read : ''
    	}
  	},
  	methods: {
  		markNotiRead (notiId, read) { 	
        	if(!this.read) {
        		console.log(notiId + " read!")
        		this.read = true;
	        	$.ajax({
	                url: api_url_noti+api_notiId+notiId, //Your api url
	                type: 'POST', //type is any HTTP method
	                headers: auth.getAuthHeader(this),
	                success: function(response){
	                    if(response.success) {
	                		console.log("Notification mark as read")
	            		}
	                }
	            })
	        }
	        
    	}
  	},
  	watch: { 
  		isRead: function(newVal, oldVal) { // watch it
	      	this.read = newVal
   		}
  	}
}
</script>

<style scoped>

.notification {
    width:300px;
    font-size:10pt;
    letter-spacing:0px;
}

</style>