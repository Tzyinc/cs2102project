<template>
  <div class="item-bidding-owner">
    <div class="item-bidding-owner-title">
      Bidding Info
    </div>
    <div class="table-responsive">
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

     <button type="submit" class="btn btn-secondary" v-on:click="choose()">Choose winning bid</button>
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
  width: 70%;
  text-align: left;
  display: inline-block;
  position: relative;
  /*background-color: #efefef;*/
  vertical-align: top;
}

.item-bidding-owner-title {
  font-weight:bold;
  font-size:2em;
}

.table-responsive {
  overflow-y: scroll;
}
</style>
