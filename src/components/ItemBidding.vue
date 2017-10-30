<template>
  <div class="item-bidding card">
    <div class="item-bidding-title card-header"><i class="fa fa-gavel" aria-hidden="true"></i> Bidding Info</div>
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

    <form>
      <div class="form-group row">
        <div class="col-sm-2"></div>
        <label class="col-sm-2 col-form-label" for="bidInput">Enter your bid:</label>
        <div class="col-sm-3">
          <input type="text" class="form-control" id="bidInput" v-model="bid_amt" placeholder="0" :disabled="isDisabled()"> <!-- check for > latest bid-->
        </div>
        <div class="col-sm-2">
            <button type="submit" class="btn btn-secondary submit-bid-button" v-on:click="submitBid()" :disabled="isDisabled()">Submit</button>
        </div>
      </div>
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
  props: ['iid', 'minBid', 'bids', 'status'],
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
    isDisabled() {
      return this.status === false
    },

    submitBid() {
      //console.log("submitting bid")
      //console.log("is bid not a number? " + isNaN(this.bid_amt))

      if (isNaN(this.bid_amt) || this.bid_amt === '' || this.bid_amt < 0) {
        alert("Please enter a valid amount")
        return false
      }

      if (confirm("Are you sure you want to place a bid of $" + this.bid_amt + "?")) {
        console.log(this.login_user + " making a bid of " + this.bid_amt + " on " + this.iid)

        var context = this
          $.ajax({
            url: api_itemBid,
            type: 'PUT',
            headers: auth.getAuthHeader(this),
            async: false,
            data: {data: {bidder_username: this.login_user, iid: this.iid, price: this.bid_amt}},
            success: function(response) {
              if(response.hasOwnProperty('success')) {
                alert("Successfully made a bid!")
              } else {
                alert("Failed to bid")
              }
            }
          })
          //sleep(100)
          //alert("making a bid...")

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
  height: 500px auto;
}

.item-bidding-title {
  font-weight:bold;
  font-size:1.5em;
  padding-bottom: 2%;
}

.table-responsive {
  max-height: 380px;
  overflow-y: scroll;
}

.submit-bid {
  margin: auto;
  padding: 3%;
  display: inline-block;
}

.submit-bid-button {
  margin: auto;
}

</style>
