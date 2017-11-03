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
          <td>{{censorUsernames(item.bidder_username)}}</td>
          <td>${{item.price}}</td>
      </tr>
      <tr>
        <td>---</td> <!-- need to fix td width-->
        <td>${{minBid}}</td>
      </tr>
    </tbody>
  </table>
    </div>

      <div class="form-group row">
        <div class="col-sm-2"></div>
        <label class="col-sm-2 col-form-label" for="bidInput">Enter your bid:</label>
        <div class="col-sm-3">
          <input type="text" class="form-control" id="bidInput" v-model="bid_amt" placeholder="0" :disabled="isDisabled()"> <!-- check for > latest bid-->
        </div>
        <div class="col-sm-2">
            <button type="submit" class="btn btn-primary submit-bid-button" v-on:click="submit()" :disabled="isDisabled()">Submit</button>
        </div>
      </div>
    <div class="error-msg">
      {{bid_error_msg}}
    </div>

    <div class="modal fade" id="bidModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirm bid</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want make a bid of <b>${{bid_amt}}</b> on this item?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-on:click="submitBid()" data-dismiss="modal">Confirm</button>
      </div>
    </div>
  </div>
</div>
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
        bid_error_msg: '',
        //bids: [],
        item: {
          minBid : 0.17
        }

    }
  },
  methods: {
    isDisabled() {
      return this.status === false || this.login_user === ''
    },

    isTwoDecimal(num) {
      console.log("num is " + num)
      var dotPos = num.search('\\.')
      console.log("dotpos is " + dotPos)
      if (dotPos === 0 || dotPos === -1) {
        return true
      } else {
        var str = num.substring(dotPos + 1)
        console.log("str is [" + str + "], length is "+str.length)
        if (str.length > 2 || str.length === 0) {
          return false
        } else {
          return true
        }
      }
    },
    censorUsernames(username) {
      if (this.login_user === username) {
        return username
      } else {
        return Array(username.length+1).join("*")
      }
    },

    submit() {
      if (isNaN(this.bid_amt) || this.bid_amt === '' || this.bid_amt < 0) {
        //alert("Please enter a valid amount")
        this.bid_error_msg = 'Please enter a valid amount'
        //return false
      } else if (!this.isTwoDecimal(this.bid_amt)) {
        this.bid_error_msg = 'Please enter up to 2 decimal places'
      }

      else if (parseFloat(this.bid_amt) < parseFloat(this.minBid)) {
        //alert("Please enter an amount higher than the minimum bid.")
        this.bid_error_msg = 'Please enter an amount equal to or higher than the minimum bid'
        //return false
      } else {
        $('#bidModal').modal('show')
      }
    },


    submitBid() {
      //if (confirm("Are you sure you want to place a bid of $" + this.bid_amt + "?")) {
        //$('#bidModal').modal('show')
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
                console.log("Successfully made a bid!")
                window.location.reload()
              } else {
                alert("Failed to bid")
              }
            }
          });
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

.error-msg {
  margin:auto;
  color: red;

}

</style>
