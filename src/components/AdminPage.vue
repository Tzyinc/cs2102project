<template>
    <div class="adminPage container">
        <div class="row adminHeader">
            <h3 class="container">Admin Console</h3>
        </div>

        <div class="row spacer"></div>

        <!--class container is to get the Users word to center, because of bootstrap-->
        <div class="row userHeader"><div class="container">Users</div></div>
        <div class="row users">
            <div v-if="users.length === 0" class="container" style="padding-left:0px; padding-right:0px;">
                There are no users in the system
            </div>
            <div v-else class="container" style="padding-right:0px; padding-left:0px;">
                <div v-for = "(user,index) in users" >
                    <deleteUser
                        :uid = "user.username"
                        :profilePic = "user.imagesrc"
                        v-on:delete-row="deleteThisRow(index)"></deleteUser>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import auth from '../auth/auth'
import DeleteUser from './DeleteUser'
import api_ep from '../api.json'
var api_url_user = api_ep.API_URL + api_ep.USER;

export default {
    name: 'AdminPage',
    components: {
        'deleteUser' : DeleteUser
    },
    data() {
        return {
            users: [],
        }
    },
    methods: {
        deleteThisRow (index) {
            this.users.splice(this.users.indexOf(index), 1)
        },
    },

    created: function () {
        if(!auth.isUserAdmin(this)) {
            this.$router.push('/')
        }

        this.$http.get(api_url_user)
        .then(response => {
            this.users = response.data;
            
        }); 
    }

}

</script>

<style scoped>

.adminHeader {
    background-color: #333;
    border-radius: 0px 0px 5px 5px;
    border: 1px inset #AAA;
    border-top:none;
    padding-top:5px;
    color:white;
}

.spacer {
    height:5px;
}

.userHeader {
    background-color: #BBB;
    border-radius: 5px 5px 0px 0px;
    border: 1px inset #AAA;
}

.users {
    background-color: #EEEEEE;
    border-radius: 0px 0px 5px 5px;
    border: 1px inset #AAA;
}

</style>
