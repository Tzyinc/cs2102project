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
     <button type="submit" class="btn btn-secondary">Submit</button>
   </form>
  <!--  <div class="input-group">
      <input class="form-control" name="enterbid"  v-model="bid_amt" placeholder="Enter your bid"/>
    </div>-->
  </div>
</template>

<script>

export default {
  name: 'ItemBidding',
  data () {
    return {
        bid_amt: '',
        item: {
          minBid : 0.99
        },

    }
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
