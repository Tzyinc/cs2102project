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
     <button type="submit" class="btn btn-secondary" v-on:click="choose(iid)" :disabled="isDisabled()">Choose winning bid</button>
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
      item: {}
    }
  },
  methods: {
    isDisabled() {
      //console.log ("HELLO" + this.bids.length + this.status)
      return (this.bids.length === 0 || this.status === false)
    },

    choose(iid) {
      //console.log("selected: " + this.selected.bidder_username + this.selected.price)
      this.bidder_username = this.selected.bidder_username
      this.price = this.selected.price
      //console.log(this.bidder_username + this.price + " ... " + typeof(this.price) + isNaN(this.price))

      if (isNaN(this.price)) {
        alert("Please choose a winning bid")
        return
      }


      if (confirm("Do you want to choose " + this.selected.bidder_username + "'s bid of $" + this.selected.price + " as the winning bid?")) {
        var context = this
          $.ajax({
            url: api_loan,
            type: 'PUT',
            headers: auth.getAuthHeader(this),
            async: false,
            data: {data: {iid: this.iid, bidder_username: this.bidder_username, price: this.price}},
            success: function(response) {
              if(response.hasOwnProperty('success')) {
                alert("Success!")
              } else {
                alert("Failed to award bid")
              }
            }
          })
          //alert("awarding bid...")
          window.location.reload() // is there another way to this
      }
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
</style>
