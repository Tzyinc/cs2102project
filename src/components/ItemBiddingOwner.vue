<template>
  <div class="item-bidding-owner card">
    <div class="item-bidding-owner-title card-header">
      Bidding Info
    </div>
    <div class="table-responsive card-body">
      <table class="table table-condensed">
        <thead>
          <tr>
            <th width="15%">Select</th>
            <th>Bidder</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "item in bids">
            <td><input type="radio" :value="item" v-model="selected"></td>
            <td>{{item.bidder_username}}</td>
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

     <button type="submit" class="btn btn-secondary choose-button" v-on:click="choose()" :disabled="isDisabled()">Choose winning bid</button>
  </div>
</template>

<script>
export default {
  name: 'ItemBiddingOwner',
  props: ['iid', 'minBid', 'bids'],
  data() {
    return {
      selected: [],
      item: {}
    }
  },
  methods: {
    isDisabled() {
      //console.log (this.bids.length)
      return this.bids.length === 0
    },

    choose() {
      console.log("selected: " + this.selected.bidder_username + this.selected.price)
      if (confirm("Do you want to choose " + this.selected.bidder_username + "'s bid of $" + this.selected.price + " as the winning bid?")) {

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
  height: 400px;
}

.item-bidding-owner-title {
  font-weight:bold;
  font-size:1.5em;
  padding-bottom: 2%;
}

.table-responsive {
  overflow-y: scroll;
}

.choose-button {
  margin: auto;
}
</style>
