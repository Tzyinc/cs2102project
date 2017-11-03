<template>
  <div>
    <div v-if="itemExists">
          <div class= "detailed-item">
          <div class="detailed-title">Listing Details
            <span v-if="isOwner()">
              <button type="button" class="btn btn-warning" :disabled="!item.status" v-on:click="updateItem()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
              <button type="button" class="btn btn-danger" :disabled="!item.status" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
            </span>
          <hr/></div>
          <div v-if="item.status"></div>
          <div v-else class="alert alert-danger" role="alert">This item has already been loaned out<span v-if="isOwner()"> to <router-link :to="{name: 'MyProfile', params: {uid: itemLoan.borrower_username}}">{{itemLoan.borrower_username}}</router-link></span>.</div>
            <div class="row detailed-row">
            <div class="col-3">
              <ItemPicture
                :imagesrc = "retrieveImageUrl(item.itemimg)"
                :name = "item.name"></ItemPicture>
            </div>
            <div class="col-9">
            <ItemDescription
              :description = "item.description"
              :tags = "itemTags">
            </ItemDescription>
          </div>
          </div>
          <div class="row detailed-row">
            <div class="col-3">
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
          <div class="col-9">
            <span v-show="!isOwner()"><ItemBidding
                                        :iid = "item.iid"
                                        :minBid = "item.minbid"
                                        :bids = "itemBids"
                                        :status = "item.status"></ItemBidding></span>
            <span v-show="isOwner()"><ItemBiddingOwner
                                        :iid = "item.iid"
                                        :minBid = "item.minbid"
                                        :bids = "itemBids"
                                        :status = "item.status"></ItemBiddingOwner></span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="errorMsg">Error 404: Item not found</h1>
    </div>


    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirm deletion</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete this item?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" v-on:click="deleteItem()" data-dismiss="modal">Delete</button>
      </div>
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
  var api_bids = api_ep.API_URL + api_ep.BIDS + '?iid='
  var api_loan = api_ep.API_URL + api_ep.LOAN + '?iid='
  var api_tags = api_ep.API_URL + api_ep.TAGS + '?iid='

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
        isAdmin: false,
        item: [],
        itemTags: [],
        itemBids: [],
        itemLoan: [],
        itemExists: true
    }
  },

  methods: {
    isOwner() {
      if (this.login_user === this.item.owner_username || this.isAdmin) {
        //console.log("this is the owner")
        return true;
      }
    },
    retrieveImageUrl(source){
      var itemImage = api_itemimg + source /*+ "?timestamp=" + new Date().getTime()*/;
      return itemImage;
    },

  	updateItem (){
  		this.$router.push({ name: 'UpdateItem', params: { iid: this.$route.params.iid }})
  	},
    deleteItem () {

      //if (confirm("Are you sure you want to delete this?")) {
        var context = this
        $.ajax({
          url: api_del,
          type: 'DELETE',
          headers: auth.getAuthHeader(this),
          async: false,
          data: {data: {iid: this.$route.params.iid}},
          success: function(response) {
            console.log("deleting")
            if(response.hasOwnProperty('success')) {
              console.log("Successfully deleted!")
              context.$router.push({name: "MyListing"})
            } else {
              alert("Failed to delete. Please try again.")
            }
          }
        })
      //}
    },
    loadItem() {

      //console.log("the full url is:" + api_url + this.$route.params.iid)
      this.$http.get(api_url + this.$route.params.iid)
        .then(response => {
          this.item = response.data;
          //console.log("this item owner username =" + this.item.owner_username)
          if (this.item.owner_username === undefined) {
            this.itemExists = false
          }
          console.log("asdf" + this.item.status)

          console.log ("getting bid info for " + this.$route.params.iid)
          this.$http.get(api_bids + this.$route.params.iid)
            .then(response => {
             this.itemBids = response.data;
             //console.log(this.itemBids)

             if (!this.item.status) {
                 console.log("getting loans info")
                 this.$http.get(api_loan + this.$route.params.iid)
                 .then(response => {
                   this.itemLoan = response.data;
                 });
              }

            });

        console.log("retrieving tags")
        this.$http.get(api_tags + this.$route.params.iid)
          .then(response => {
            this.itemTags = response.data;
          })
        });
    }
  },

  created: function () {
    this.login_user = auth.getUsername(this)
    this.isAdmin = auth.isUserAdmin(this)
    this.loadItem()

  },
  watch: {
      '$route': 'loadItem'
  }
}
</script>

<style scoped>

.detailed-item {
  width: 80%;
  margin: 0 auto;
  /*background-color: #efefef; /*to remove later*/
  padding-bottom: 100px;

}

.detailed-row {
  padding: 5px;
}

.detailed-title {
  text-align: left;
  font-weight:bold;
  font-size: 2em;
  padding-top: 2%;
  padding-bottom: 2%;
}

.buttons {
  float: right;
  position: sticky;
  /*right: 15%;*/
}

</style>
