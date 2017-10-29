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
              :imagesrc = "retrieveImageUrl(item.itemimg)"></ItemPicture>
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
          <span v-show="!isOwner()"><ItemBidding
                                      :iid = "item.iid"
                                      :minBid = "item.minbid"
                                      :bids = "itemBids"></ItemBidding></span>
          <span v-show="isOwner()"><ItemBiddingOwner
                                      :iid = "item.iid"
                                      :minBid = "item.minbid"
                                      :bids = "itemBids"></ItemBiddingOwner></span>
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
  import ItemBiddingOwner from './ItemBiddingOwner'


  var api_url = api_ep.API_URL + api_ep.ITEM + '?iid='
  var api_itemimg = api_ep.API_URL + api_ep.IMAGE + '/'
  var api_del = api_ep.API_URL + api_ep.ITEM
  var api_bids = api_ep.API_URL + 'api/bids' + '?iid='

  export default {
  name: 'DetailedItem',
  components: {
    ItemPicture,
    ItemDescription,
    ItemOwnerInfo,
    ItemBidding,
    ItemBiddingOwner
  },
  data() {
    return {
        login_user: '',
        item: [],
        itemBids: []
    }
  },

  methods: {
    isOwner() {
      if (this.login_user === this.item.owner_username) {
        console.log("this is the owner")
        return true;
      }
    },
    retrieveImageUrl(source){
      var itemImage = api_itemimg + source /*+ "?timestamp=" + new Date().getTime()*/;
      return itemImage;
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
          headers: auth.getAuthHeader(this),
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
    //console.log("the full url is:" + api_url + this.$route.params.iid)
    this.$http.get(api_url + this.$route.params.iid)
      .then(response => {
        this.item = response.data;
        //console.log("asdf" + this.item);
      });
    console.log ("getting bid info for " + this.$route.params.iid)
    this.$http.get(api_bids + this.$route.params.iid)
      .then(response => {
       this.itemBids = response.data;
       console.log(this.itemBids)
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
