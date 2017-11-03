<template>
  <div class="item-bidding-owner card">
    <div class="item-bidding-owner-title card-header"><i class="fa fa-gavel" aria-hidden="true"></i> Bidding Info</div>
    <div class="table-responsive card-body">
      <table class="table table-condensed">
        <thead class="thead-light">
          <tr>
            <th width="15%">Select</th>
            <th>Bidder</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "item in bids">
            <td><input type="radio" :value="item" v-model="selected" :disabled="isDisabled()"></td>
            <td><router-link :to="{name: 'MyProfile', params: {uid: item.bidder_username}}">{{item.bidder_username}}</router-link></td>
            <td>${{item.price}}</td>
          </tr>
          <tr>
            <td></td>
            <td>---</td> <!-- need to fix td width-->
            <td>${{minBid}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-padding">
     <button type="submit" class="btn btn-primary" v-on:click="check()" :disabled="isDisabled()">Choose winning bid</button>
   </div>
   <div class="error-msg">
     {{error_msg}}
   </div>

   <div class="modal fade" id="selectBidModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog" role="document">
   <div class="modal-content">
     <div class="modal-header">
       <h5 class="modal-title" id="exampleModalLabel">Confirm bid winner</h5>
       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>
     <div class="modal-body">
       Are you sure you want to choose {{bidder_username}}'s bid of ${{price}} as the winning bid?
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       <button type="button" class="btn btn-primary" v-on:click="choose(iid)" data-dismiss="modal">Confirm</button>
     </div>
   </div>
 </div>
</div>
  </div>
</template>

<script>

import auth from '../auth/auth'
import api_ep from '../api.json'

var api_loan = api_ep.API_URL + 'api/loan'

export default {
  name: 'ItemBiddingOwner',
  props: ['iid', 'minBid', 'bids', 'status'],
  data() {
    return {
      selected: [],
      bidder_username: '',
      price: '',
      error_msg: '',
      item: {}
    }
  },
  methods: {
    isDisabled() {
      //console.log ("HELLO" + this.bids.length + this.status)
      return (this.bids.length === 0 || this.status === false)
    },

    check() {
      //console.log("selected: " + this.selected.bidder_username + this.selected.price)
      this.bidder_username = this.selected.bidder_username
      this.price = this.selected.price
      //console.log(this.bidder_username + this.price + " ... " + typeof(this.price) + isNaN(this.price))

      if (isNaN(this.price)) {
        this.error_msg = "Please choose a winning bid"
        return
      } else {
        $('#selectBidModal').modal('show')
      }
    },

    choose(iid) {

      //if (confirm("Do you want to choose " + this.selected.bidder_username + "'s bid of $" + this.selected.price + " as the winning bid?")) {
        var context = this
          $.ajax({
            url: api_loan,
            type: 'PUT',
            headers: auth.getAuthHeader(this),
            async: false,
            data: {data: {iid: this.iid, bidder_username: this.bidder_username, price: this.price}},
            success: function(response) {
              if(response.hasOwnProperty('success')) {
                console.log("Successfully loaned out")
              } else {
                alert("Failed to award bid")
              }
            }
          })
          //alert("awarding bid...")
          window.location.reload() // is there another way to this
      //}
    }
  }
}

</script>

<style scoped>
.item-bidding-owner {
  width: 100%;
  text-align: left;
  position: relative;
  /*background-color: #efefef;*/
  vertical-align: top;
  height: 500px auto;
}

.item-bidding-owner-title {
  font-weight:bold;
  font-size:1.5em;
  padding-bottom: 2%;
}

.table-responsive {
  max-height: 380px;
  overflow-y: scroll;
}

.button-padding {
  margin:auto;
  padding: 10px;
}

.error-msg {
  margin:auto;
  color: red;

}
</style>
