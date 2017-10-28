<template>
  <div class="item-bidding">
    <div class="item-bidding-title">
      Bidding Info
    </div>
    <div class="table-responsive">
      <table class="table table-condensed">
    <thead>
      <tr>
        <th>Bidder</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>username here.</td> <!-- need to fix td width-->
        <td>{{item.minBid}}</td>
      </tr>
    </tbody>
  </table>
    </div>

    <form class="form-inline">
     <div class="form-group">
       <label>Enter your bid:</label>
       <input class="form-control" v-model="bid_amt" placeholder="0">
     </div>
     <button type="submit" class="btn btn-secondary" v-on:click="submitBid()">Submit</button>
   </form>
  <!--  <div class="input-group">
      <input class="form-control" name="enterbid"  v-model="bid_amt" placeholder="Enter your bid"/>
    </div>-->
  </div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'

var api_itemBid = api_ep.API_URL + 'api/bid' + '?iid='

export default {
  name: 'ItemBidding',
  props: ['iid', 'minBid'],
  data () {
    return {
        login_user: '',
        bid_amt: '',
        item: {
          minBid : 0.99
        },

    }
  },
  methods: {
    submitBid() {
      console.log("submitting bid")
      if (this.login_user == 'DEFAULT_USER') {
        console.log("not logged in")
        return
      }
      if (confirm("Are you sure you want to place a bid of $" + this.bid_amt + "?")) {
        console.log(this.login_user + " making a bid of " + this.bid_amt + " on " + this.iid)

        var context = this
          $.ajax({
            url: api_itemBid,
            type: 'PUT',
            headers: auth.getAuthHeader(this),
            data: {data: {bidder_username: this.login_user, iid: this.iid, price: this.bid_amt}},
            success: function(response) {
              if(response.hasOwnProperty('success')) {
                alert("successfully made a bid")
              } else {
                alert("failed to bid")
              }
            }
          })
          alert("something...")

    }
  }
  },
  created: function () {
    this.login_user = auth.getUsername(this)
    console.log("logged in user is: " + this.login_user)
  }
}
</script>

<style scoped>
.item-bidding {
  width: 70%;
  text-align: left;
  display: inline-block;
  position: relative;
  /*background-color: #efefef;*/
  vertical-align: top;
}

.item-bidding-title {
  font-weight:bold;
  font-size:2em;
}

.table-responsive {
  overflow-y: scroll;
}
</style>
