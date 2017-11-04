<template>
<div>
    <div class="modal fade" :id="uid" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">Confirm Delete</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <p class="errorColor" v-bind:class="{ successColor: deleteUserSuccess }">{{feedbackMsg}}</p>
            <button type="button" class="btn btn-basic" data-dismiss="modal">No</button>
            <button type="button" class="btn btn-danger" @click="deleteUser(uid)">Yes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="list-group-item deleteUser container" v-on:click="goToUser(uid)">
        <div class ="row">
            <div class="col-1 text-left">
                <div class="displayPic">
                    <displaypic :oldImage="loadedProfilePic" :editPermission="false"></displaypic>
                </div>
            </div>
            <div class="col-6 text-left">
            	<h3>{{uid}}</h3>
            </div>
            <div class="col text-right">
                <button type="button" class="btn btn-danger"  v-on:click.stop="cfmDelete()"> Delete User </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import auth from '../auth/auth'
import DisplayPic from './DisplayPic'
import api_ep from '../api.json'
var api_url_delete = api_ep.API_URL + api_ep.DELETE;
var api_url_uimage = api_ep.API_URL + api_ep.UIMAGE + '/'

export default {
	name: 'DeleteUser',
  	props: ['uid', 'profilePic'],

    components: {
        'displaypic' : DisplayPic
    },
 	data () {
    	return {
            loadedProfilePic : '',
            feedbackMsg : '',
            deleteUserSuccess: false
    	}
  	},
  	methods: {
  		goToUser (uid) {
        	this.$router.push({ name: 'MyProfile', params: { uid: uid }})

    	},
        cfmDelete () {
            $('#'+this.uid).modal('show'); 
        },

        deleteUser (uid) {
            if(auth.isUserAdmin(this)) {
                if(this.uid == auth.getUsername(this)) {
                    this.feedbackMsg = "Cannot delete yourself!"
                } else {
                    var target = {
                      username: this.uid,
                    }
                    var context = this
                    $.ajax({
                    url: api_url_delete, //Your api url
                    type: 'POST', //type is any HTTP method
                    headers: auth.getAuthHeader(this),
                    data: {data: target}, //Data as js object
                    success: function(response){    
                        context.closeModal(2000, 'User Deleted!')
                    }
                    })
                }
            } else {
                this.feedbackMsg = "No permission to delete, please refresh the page"
            }
        },
        closeModal (duration, msg) {
            var context = this;
            this.feedbackMsg = msg;
            this.deleteUserSuccess = true;
            setTimeout(function() {
                $('#'+context.uid).modal('hide');
                context.feedbackMsg = '';
                context.deleteUserSuccess = false;
                context.$emit('delete-row','');
            }, duration);
        },
  	},
  	watch: {
  		
  	},
	created: function() {
		if(this.profilePic == '' || this.profilePic == null) {
            this.loadedProfilePic = '';    
        } else {
            this.loadedProfilePic = api_url_uimage + this.profilePic;
        }
	}
}
</script>

<style>

.displayPic {
  width: 60px;
  height: 60px;
  overflow: hidden;
  position: relative;
  background-color: white;
  border-radius: 5px;
  border: 1px inset #AAA;
}

.deleteUser {
    width:100%;
    font-size:10pt;
    letter-spacing:0px;
}

.errorColor {
    width:100%;
    align:left;
    color:red;
}

.successColor {
    color:green;
}

</style>
