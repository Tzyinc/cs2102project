<template>
    <div class="adminPage container">
        <div class="row adminHeader">
            <h3 class="container">Admin Console</h3>
        </div>

        <div class="row spacer"></div>

        <!--class container is to get the Users word to center, because of bootstrap-->
        <div class="row userHeader"><div class="container">Users</div></div>
        <div class="row users">
            <div v-if="users.length === 0" class="container">
                There are no users in the system
            </div>
            <div v-else>
                <div v-for = "user in users" >
                    <notification
                        :iid = "notification.iid"
                        :notiType = "notification.type"
                        :isRead = "notification.isread"
                        :nid = "notification.nid"
                        :name = "notification.name"></notification>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import auth from '../auth/auth'

export default {
    name: 'AdminPage',

    data() {
        return {
            users: [],
        }
    },

    created: function () {
        if(!auth.isUserAdmin(this)) {
            this.$router.push('/')
        } 
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
