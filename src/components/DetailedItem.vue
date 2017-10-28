<template>
  <div>
    <div v-show="isOwner()">
      <button type="button" class="btn btn-danger pull-right" v-on:click="deleteItem()"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
      <button type="button" class="btn btn-warning pull-right" v-on:click="load()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
    </div>
      <div class= "container">
        <div class="detailed-title">Listing Details</div>
        <div class="row">
          <div class="col-md-3">
            <ItemPicture
              :imagesrc = "item.imagesrc"></ItemPicture>
          </div>
          <div class="col-md-9">
          <ItemDescription
            :description = "item.description">
          </ItemDescription>
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
          <ItemOwnerInfo
            :owner_username = "item.owner_username"
            :name = "item.name"
            :location = "item.location"
            :status = "item.status"
            :timelisted = "item.timelisted"
            :startdate = "item.startdate"
            :enddate = "item.enddate">
          </ItemOwnerInfo>
        </div>
        <div class="col-md-9">
          <ItemBidding></ItemBidding>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/auth'
  import api_ep from '../api.json'
  import ItemPicture from './ItemPicture'
  import ItemOwnerInfo from './ItemOwnerInfo'
  import ItemDescription from './ItemDescription'
  import ItemBidding from './ItemBidding'


  var api_url = api_ep.API_URL + api_ep.ITEM + '?iid='
  var api_del = api_ep.API_URL + api_ep.ITEM

  export default {
  name: 'DetailedItem',
  components: {
    ItemPicture,
    ItemDescription,
    ItemOwnerInfo,
    ItemBidding
  },
  data() {
    return {
        login_user: '',
        item: []
    }
  },

  methods: {
    isOwner() {
      if (this.login_user === this.item.owner_username) {
        console.log("true")
        return true;
      }
    },
  	load (){
  		this.$router.push({ name: 'UpdateItem', params: { iid: this.$route.params.iid }})
  	},
    deleteItem () {

      if (confirm("Are you sure you want to delete this?")) {
      var context = this
        $.ajax({
          url: api_del,
          type: 'DELETE',
          data: {data: {iid: this.$route.params.iid}},
          success: function(response) {
            console.log("deleting")
            if(response.hasOwnProperty('success')) {
              alert("successfully deleted")
              context.$router.push({name: "myListing"})
            } else {
              alert("Failed to delete. Please try again.")
            }
          }
        })
      }
    }
  },

  created: function () {
    this.login_user = auth.getUsername(this)
    console.log("the full url is:" + api_url + this.$route.params.iid)
    this.$http.get(api_url + this.$route.params.iid)
      .then(response => {
        this.item = response.data;
        console.log("asdf" + this.item);
      });
  }
}
</script>

<style scoped>
.detailed-item {
  width: 90%;
  margin: 0 auto;
  /*background-color: #efefef; /*to remove later*/

}

.detailed-item * {
  padding:3%;
  background-color: #efefef;
  border: 1px solid #000;
}

.detailed-title {
  text-align: left;
  font-weight:bold;
  font-size: 2em;
  padding-bottom: 6%;
  display:
}

.buttons {
  float: right;
  position: sticky;
  /*right: 15%;*/
}

</style>
