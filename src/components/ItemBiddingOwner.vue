<template>
  <div class="item-bidding-owner">
    <div class="item-bidding-owner-title">
      Bidding Info
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemBiddingOwner',
  data() {
    return {

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
