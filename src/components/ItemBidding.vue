<template>
  <div class="item-bidding card">
    <div class="item-bidding-title card-header">
      Bidding Info
    </div>
    <div class="table-responsive card-body">
      <table class="table table-condensed">
    <thead>
      <tr>
        <th>Bidder</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for = "item in bids">
          <td>{{item.bidder_username}}</td>
          <td>${{item.price}}</td>
      </tr>
      <tr>
        <td>---</td> <!-- need to fix td width-->
        <td>${{minBid}}</td>
      </tr>
    </tbody>
  </table>
    </div>

    <form class="form-inline">
     <div class="form-group submit-bid">
       <label>Enter your bid: </label>
       <input class="form-control" v-model="bid_amt" placeholder="0"> <!-- check for > latest bid-->
     </div>
     <button type="submit" class="btn btn-secondary submit-bid-button" v-on:click="submitBid()">Submit</button>
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
  props: ['iid', 'minBid', 'bids'],
  data () {
    return {
        login_user: '',
        bid_amt: '',
        //bids: [],
        item: {
          minBid : 0.17
        }

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
                alert("successfully made a bid!")
              } else {
                alert("failed to bid")
              }
            }
          })
          //alert("something...")

    }
  }
  },
  created: function () {
    this.login_user = auth.getUsername(this)
    //console.log("item iid is" + this.iid);

    console.log("logged in user is: " + this.login_user)

  }
}
</script>

<style scoped>
.item-bidding {
  width: 100%;
  text-align: left;
  position: relative;
  /*background-color: #efefef;*/
  vertical-align: top;
  height: 400px;
}

.item-bidding-title {
  font-weight:bold;
  font-size:1.5em;
  padding-bottom: 2%;
}

.table-responsive {
  overflow-y: scroll;
}

.submit-bid {
  margin: auto;
  padding: 3%;
}

.submit-bid-button {
  margin: auto;
}

</style>
